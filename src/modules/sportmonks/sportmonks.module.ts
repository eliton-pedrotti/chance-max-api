import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseModule } from 'src/database/database.module';
import { Championship } from 'src/database/entities/championship.entity';
import { DataChampionship } from 'src/database/entities/datachampionship.entity';
import { Season } from 'src/database/entities/season.entity';
import { Team } from 'src/database/entities/team.entity';
import { Axios } from 'src/utils/http-request';
import { SportmonksController } from './sportmonks.controller';
import { SportmonksService } from './sportmonks.service';

@Module({
  imports: databaseModule,
  controllers: [SportmonksController],
  providers: [SportmonksService, Axios],
})
export class SportmonksModule {}
