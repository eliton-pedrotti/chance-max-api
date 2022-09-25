import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserCreator } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { encrypt } from 'src/utils/crypto';
import { hash } from 'bcrypt';
import { PagseguroService } from '../pagseguro/pagseguro.service';
import { NodemailerService } from '../nodemailer/nodemailer.service';
import { generate } from 'generate-password';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly pagseguroService: PagseguroService,
    private readonly nodemailerService: NodemailerService
  ) { }

  public async createUser(req: User): Promise<any> {

    const verifyIfUserAlreadyExists: User = await this.getUserByEmail(req.email);

    if (verifyIfUserAlreadyExists) {
      throw new HttpException('Usuário existente!', HttpStatus.NOT_ACCEPTABLE);
    }

    console.log('Efetuando a criacao de usuario...', req);

    let expirationDateMiliseconds: number;
    const subscriptionDate: Date = new Date();
    const saveDateSubscription: string = subscriptionDate.toISOString().split('T')[0];

    req.plan = Number(req.plan);
    req.address.number_address = Number(req.address.number_address);

    switch (req.plan) {
      case 1:
        expirationDateMiliseconds = subscriptionDate.setDate(subscriptionDate.getDate() + 30);
        break;
      case 2:
        expirationDateMiliseconds = subscriptionDate.setDate(subscriptionDate.getDate() + 90);
        break;
      case 3:
        expirationDateMiliseconds = subscriptionDate.setDate(subscriptionDate.getDate() + 180);
        break;
      default:
        break;
    }

    const expirationDate: Date = new Date(expirationDateMiliseconds);
    const saveDateExpiration: string = expirationDate.toISOString().split('T')[0];

    req.day_of_subscription = saveDateSubscription;
    req.day_of_expiration = saveDateExpiration;
    req.isActive = 1;

    const user: User = UserCreator.create(req);
    console.log('Usuario criado com sucesso...', user);

    const verifyIfPaymentApproves = await this.pagseguroService.createRecurrentCharge(req.card, req.plan);

    if (verifyIfPaymentApproves) {
      await this.hashValues(user);
      await this.usersRepository.save(user);

      return {
        message: "Usuário criado e pagamento realizado com sucesso!"
      };
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      }
    })
  }

  public async getUserById(userId: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        id: userId,
      }
    })
  }

  private async hashValues(user: User): Promise<void> {
    user.cpf = encrypt(user.cpf);
    user.password = await hash(user.password, 10);
    user.card.card_name = encrypt(user.card.card_name);
    user.card.card_number = encrypt(user.card.card_number);
    user.card.exp_month = encrypt(user.card.exp_month);
    user.card.exp_year = encrypt(user.card.exp_year);
    user.card.security_code = encrypt(user.card.security_code);
  }

  public async recoverPass(email: string) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new HttpException('Usuário inexistente!', HttpStatus.BAD_REQUEST);
    }

    const newPass = generate({
      length: 10,
      numbers: true
    });

    const newPassHashed = await hash(newPass, 10);

    await this.usersRepository.update({ id: user.id }, {
      password: newPassHashed
    })

    console.log('Enviando senha atualizada ao email do usuario...');
    await this.nodemailerService.recoverPass(user.email, newPass);

    return {
      message: 'Senha enviada com sucesso!'
    }
  }
}
