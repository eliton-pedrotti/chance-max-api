import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Axios } from 'axios';
import { databaseProviders } from './database.providers';
import { Address } from './entities/address.entity';
import { Card } from './entities/card.entity';
import { Championship } from './entities/championship.entity';
import { DataChampionship } from './entities/datachampionship.entity';
import { Plan } from './entities/plan.entity';
import { Season } from './entities/season.entity';
import { Statistics } from './entities/statistics.entity';
import { Team } from './entities/team.entity';
import { User } from './entities/user.entity';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule { }

export const databaseModule = [
  Axios,
  TypeOrmModule.forFeature([Championship, DataChampionship, Season, Team, User, Address, Plan, Card, Statistics]),
]
