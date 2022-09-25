import { Module } from '@nestjs/common';
import { databaseModule } from 'src/database/database.module';
import { Axios } from 'src/utils/http-request';
import { PagseguroService } from './pagseguro.service';
import { PagseguroController } from './pagseguro.controller';

@Module({
  imports: databaseModule,
  providers: [PagseguroService, Axios],
  exports: [PagseguroService],
  controllers: [PagseguroController]
})
export class PagseguroModule {}
