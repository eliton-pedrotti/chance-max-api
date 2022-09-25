import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { PagseguroPayment } from 'src/@types/pagseguro.types';
import { Card } from 'src/database/entities/card.entity';
import { Plan } from 'src/database/entities/plan.entity';
import { User } from 'src/database/entities/user.entity';
import { typePayment } from 'src/enums/type-payment.enum';
import { decrypt } from 'src/utils/crypto';
import { Axios } from 'src/utils/http-request';
import { Repository, UpdateResult } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PagseguroService {
  constructor(
    private readonly httpRequest: Axios,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  public async createRecurrentCharge(data: Card, planId: number): Promise<any> {
    const planData: Plan = await this.getPlanData(planId);
    console.log('Processando pagamento...');

    const payload: PagseguroPayment = this.createTransformToPayment(
      data,
      planData,
      typePayment.INITIAL,
      1,
      false
    );

    const payment = await this.httpRequest.post('charges', payload) as any;

    if (payment.status === 'DECLINED') {
      throw new UnauthorizedException(payment.payment_response.message);
    }

    return await this.capturePayment(payment.id, planData);
  }

  private async getPlanData(planId: number): Promise<Plan> {
    return await this.planRepository.findOne({
      where: {
        id: planId
      }
    });
  }

  private async capturePayment(id: string, planData: Plan): Promise<any> {
    const payload = {
      amount: {
        value: planData.value
      }
    }
    console.log('Pagamento processado com sucesso!');
    return await this.httpRequest.post(`charges/${id}/capture`, payload);
  }

  private createTransformToPayment(
    card: Card,
    plan: Plan,
    type: typePayment,
    installments: number | string,
    capture: boolean
  ): PagseguroPayment {
    return {
      reference_id: uuid(),
      description: `${plan.name} ChanceMax`,
      amount: {
        value: plan.value,
        currency: "BRL"
      },
      payment_method: {
        type: "CREDIT_CARD",
        installments: installments,
        capture: capture,
        card: {
          number: card.card_number,
          exp_month: card.exp_month,
          exp_year: card.exp_year,
          security_code: card.security_code,
          holder: {
            name: card.card_name
          }
        }
      },
      recurring: {
        type: type
      },
      notification_urls: [

      ],
      metadata: {
        Exemplo: "Aceita qualquer informação",
        NotaFiscal: "123",
        idComprador: "123456"
      }
    }
  }

  public async createSubsequentPayment(): Promise<void> {
    const users: User[] = await this.usersRepository.find({
      relations: ["card"],
    });

    const atualDate: Date = new Date();

    for (const user of users) {
      if (user.isActive) {
        const userDateOfExpiration: Date = new Date(user.day_of_expiration);
        userDateOfExpiration.setHours(userDateOfExpiration.getHours() + 3);

        /*Verifica se a data de hoje é maior ou igual a data em que o plano do usuario expira, se true, 
        efetua o a cobrança novamente */
        const verifyIfPlanByUserIsExpired: Boolean = atualDate >= userDateOfExpiration;
        const planData: Plan = await this.getPlanData(user.plan);

        if (verifyIfPlanByUserIsExpired) {
          const card: Card = this.decryptCard(user.card);
          const payload: PagseguroPayment = this.createTransformToPayment(
            card,
            planData,
            typePayment.SUBSEQUENT,
            "1",
            true
          );

          console.log('Renovando assinatura...');
          const { id } = await this.httpRequest.post('charges', payload) as any;
          await this.capturePayment(id, planData);

          let expirationDateMiliseconds: number;
          const subscriptionDate: Date = new Date();

          switch (user.plan) {
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

          await this.usersRepository.update({ id: user.id }, {
            day_of_expiration: saveDateExpiration
          })

          console.log('Assinatura renovada com sucesso!');
        }
      }
    }
  }

  private decryptCard(card: Card): Card {
    card.card_name = decrypt(card.card_name);
    card.card_number = decrypt(card.card_number);
    card.exp_month = decrypt(card.exp_month);
    card.exp_year = decrypt(card.exp_year);
    card.security_code = decrypt(card.security_code);
    return card;
  }

  public async cancelPlan(userId: number): Promise<any> {
    console.log('Cancelando plano do usuario =>', userId);
    await this.usersRepository.update({
      id: userId
    },
      {
        isActive: 0
      });

    return {
      message: "Plano cancelado com sucesso!"
    };
  }

  public async reactivePlan(user: User): Promise<any> {
    const userData = await this.usersRepository.findOne({
      where: {
        email: user.email
      },
      relations: ["card"]
    });

    const card = this.decryptCard(userData.card);
    const verifyPassword = await compare(user.password, userData.password);

    if (!verifyPassword) {
      throw new UnauthorizedException("Senha incorreta!");
    }

    await this.createRecurrentCharge(card, userData.plan);
    await this.usersRepository.update({ id: userData.id }, { isActive: 1 });

    return {
      message: "Plano reativado com sucesso!"
    };
  }
}