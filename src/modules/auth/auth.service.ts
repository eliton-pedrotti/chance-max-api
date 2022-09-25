import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { AccessToken } from 'src/@types/accesstoken.types';
import { User } from 'src/database/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {

    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new HttpException('Email ou senha incorretos!', HttpStatus.BAD_REQUEST);
    }

    /**Verifica se o usuario possui plano ativo */
    if (user.isActive === 0) {
      throw new BadRequestException('Usuário não possui plano ativo!');
    }

    const hashPass = compareSync(pass, user.password);

    if (user && hashPass) {
      const { password, ...result } = user;
      return result;
    }

    if(!hashPass){
      throw new HttpException('Email ou senha incorretos!', HttpStatus.BAD_REQUEST);
    }
  }

  async login(user: User): Promise<AccessToken> {
    const payload = {
      username: user.name,
      sub: user.id
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}