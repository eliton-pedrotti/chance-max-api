import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NodemailerService {
  constructor(private readonly mailerService: MailerService) { }

  public async recoverPass(email: string, pass: string): Promise<void> {
    return await this.mailerService
      .sendMail({
        to: email,
        from: 'noreply@chancemax.com.br',
        subject: 'Nova senha Chance Max ✔',
        text: `Sua nova senha é => ${pass}`,
      })
  }
}