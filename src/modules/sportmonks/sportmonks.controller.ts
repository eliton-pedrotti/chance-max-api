import { Controller, Delete, Get } from '@nestjs/common';
import { SportmonksService } from './sportmonks.service';

@Controller('sportmonks')
export class SportmonksController {
  constructor(private readonly sportmonksService: SportmonksService) { }

  @Get('/all-data-matches')
  getDataAPISportMonks(): Promise<void> {
    try {
      return this.sportmonksService.getDataChampionship();
    } catch (error) {
      return error;
    }
  }

  @Get('/all-season')
  getAllSeasonsSportMonks(): Promise<void> {
    try {
      return this.sportmonksService.getAllSeasonsSportMonks();
    } catch (error) {
      return error;
    }
  }

  @Get('/all-leagues')
  getAllLeaguesSportMonks(): Promise<void> {
    try {
      return this.sportmonksService.getAllLeaguesSportMonks();
    } catch (error) {
      return error;
    }
  }

  @Get('/all-teams-by-season')
  getTeamsBySeasonSportMonks(): Promise<void> {
    try {
      return this.sportmonksService.getTeamsBySeasonSportMonks();
    } catch (error) {
      return error;
    }
  }

  @Get('/update-data-championship')
  updateDataChampionship(): Promise<void> {
    try {
      return this.sportmonksService.updateDataChampionship();
    } catch (error) {
      return error;
    }
  }
}
