import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { SportmonksModule } from './modules/sportmonks/sportmonks.module';
import { TeamsModule } from './modules/teams/teams.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PagseguroModule } from './modules/pagseguro/pagseguro.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { NodemailerModule } from './modules/nodemailer/nodemailer.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   url: process.env.DATABASE_URI,
    //   type: 'postgres',
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    //   // logging: true,
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   synchronize: true, // This for development
    //   autoLoadEntities: true,
    // }),
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: "",
          pass: ""
        }
      },
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'dbmaster',
      database: 'chanceMaxdb',
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],

      //FICAR ESPERTO AQUI
      synchronize: true,
    }),
    TeamsModule,
    SportmonksModule,
    UsersModule,
    AuthModule,
    PagseguroModule,
    NodemailerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
