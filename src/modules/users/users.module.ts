import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { databaseModule } from 'src/database/database.module';
import { PagseguroService } from '../pagseguro/pagseguro.service';
import { Axios } from 'src/utils/http-request';
import { NodemailerService } from '../nodemailer/nodemailer.service';

@Module({
  imports: databaseModule,
  controllers: [UsersController],
  providers: [UsersService, PagseguroService, Axios, NodemailerService],
  exports: [UsersService]
})
export class UsersModule {}