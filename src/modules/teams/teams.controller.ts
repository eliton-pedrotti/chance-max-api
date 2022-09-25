import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Championship } from 'src/database/entities/championship.entity';
import { DataChampionship } from 'src/database/entities/datachampionship.entity';
import { Team } from 'src/database/entities/team.entity';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/all-championships')
  async findAllChampionships(): Promise<Championship[]> {
    try {
      return this.teamsService.findAllChampionships();
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/championship/:idChampionship')
  async findChampionshipById(
    @Param('idChampionship') idChampionship: number
  ): Promise<Championship> {
    try {
      return this.teamsService.findChampionshipById(idChampionship);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:idTeam')
  async findTeamById(
    @Param('idTeam') idTeam: number
  ): Promise<Team> {
    try {
      return this.teamsService.findTeamById(idTeam);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all-teams/:idSeason')
  async findTeamsBySeasonId(
    @Param('idSeason') idSeason: number
  ): Promise<Team[]> {
    try {
      return this.teamsService.findTeamsBySeasonId(idSeason);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all-matches/:idChampionship/:idSeason')
  async findMatchesByIdChampionshipAndSeason(
    @Param('idChampionship') idChampionship: number,
    @Param('idSeason') idSeason: number
  ): Promise<DataChampionship[]> {
    try {
      return this.teamsService.findMatchesByIdChampionshipAndSeason(idChampionship, idSeason);
    } catch (error) {
      return error;
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/statistics/:seasonId')
  async findTeamsStatistics(
    @Param('seasonId') seasonId: number,
  ): Promise<any> {
    try {
      return this.teamsService.findTeamsStatistics(seasonId);
    } catch (error) {
      return error;
    }
  }
}
