import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { flatten } from 'lodash';
import { DataChampionshipType } from 'src/@types/datachampioship.types';
import { Result } from 'src/@types/result.types';
import {
  NextRound,
  RoundsBySeason,
} from 'src/@types/seasons.types';
import { Championship, ChampionshipCreator } from 'src/database/entities/championship.entity';
import { DataChampionship } from 'src/database/entities/datachampionship.entity';
import { Season, SeasonCreator } from 'src/database/entities/season.entity';
import { Team, TeamCreator } from 'src/database/entities/team.entity';
import { Axios } from 'src/utils/http-request';
import { Repository } from 'typeorm';
import { StageEnum } from '../../enums/type-stage.enum'

require('dotenv').config();
const { API_TOKEN, ENDPOINT_STATISTICS } = process.env;

@Injectable()
export class SportmonksService {
  private match: DataChampionshipType;

  constructor(
    private readonly httpRequest: Axios,
    @InjectRepository(Championship)
    private readonly championshipRepository: Repository<Championship>,
    @InjectRepository(DataChampionship)
    private readonly dataChampionshipRepository: Repository<DataChampionship>,
    @InjectRepository(Season)
    private readonly seasonRepository: Repository<Season>,
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>
  ) { }

  async getIdTeamOfSportMonks(idSportMonks: number, seasonId: number): Promise<number> {
    console.log('Buscando id de time...');
    const idTeamOfOurBase: Team = await this.teamsRepository.findOne({
      where: {
        id_team_sport_monks: idSportMonks,
        season_id: seasonId
      },
    });
    return idTeamOfOurBase ? idTeamOfOurBase.id : null;
  }

  async getIdChampionshipOfSportMonks(id: number): Promise<number> {
    console.log('Buscando id de championship...');
    const idTeamOfOurBase: Championship = await this.championshipRepository.findOne({
      where: {
        id_team_monks: id,
      },
    });
    return idTeamOfOurBase ? idTeamOfOurBase.id : null;
  }

  @Cron('00 05 * * *', {
    timeZone: 'America/Sao_Paulo',
  })
  async updateDataChampionship(): Promise<void> {

    const championsLeague = [];
    const europaLeague = [];
    const premierLeague = [];
    const bundesliga = [];
    const ligue1 = [];
    const serieA = [];
    const primeiraLiga = [];
    const laLiga = [];
    const superLiga = [];
    const superLigaArg = [];
    const serieABr = [];
    const serieBBr = [];
    const sudamericana = [];
    const libertadores = [];

    const dataChampionship: DataChampionship = new DataChampionship();
    const currentSeasons: any[] = [];

    const totalLeagues = [
      championsLeague,
      europaLeague,
      premierLeague,
      bundesliga,
      ligue1,
      serieA,
      primeiraLiga,
      laLiga,
      superLiga,
      superLigaArg,
      serieABr,
      serieBBr,
      sudamericana,
      libertadores,
    ]

    let total_pages: number = 1;
    const atualDate = new Date();
    const format = atualDate.setDate(atualDate.getDate() + 1);
    const formatNextDate: Date = new Date(format);
    const nextDate = formatNextDate.toISOString().split('T')[0];

    //Em 2023 isso vai ter que ser alterado
    for (let i: number = 1; i <= total_pages; i++) {
      const dataGames = await this.httpRequest.get(`v2.0/fixtures/between/${nextDate}/2022-12-31?api_token=${API_TOKEN}&page=${i}&include=stats,round,stage`, true) as any

      if (dataGames.meta.pagination && dataGames.meta.pagination.total_pages > 1) {
        total_pages = dataGames.meta.pagination.total_pages;
      }

      for (const value of dataGames.data) {
        if (value.league_id === 2) {
          championsLeague.push(value);
        }

        if (value.league_id === 5) {
          europaLeague.push(value);
        }

        if (value.league_id === 8) {
          premierLeague.push(value);
        }

        if (value.league_id === 82) {
          bundesliga.push(value);
        }

        if (value.league_id === 271) {
          superLiga.push(value);
        }

        if (value.league_id === 301) {
          ligue1.push(value);
        }

        if (value.league_id === 384) {
          serieA.push(value);
        }

        if (value.league_id === 462) {
          primeiraLiga.push(value);
        }

        if (value.league_id === 564) {
          laLiga.push(value);
        }

        if (value.league_id === 636) {
          superLigaArg.push(value);
        }

        if (value.league_id === 648) {
          serieABr.push(value);
        }

        if (value.league_id === 651) {
          serieBBr.push(value);
        }

        if (value.league_id === 1116) {
          sudamericana.push(value);
        }

        if (value.league_id === 1122) {
          libertadores.push(value);
        }
      }
    }

    for (const league of totalLeagues) {
      for (this.match of league) {
        console.log('Atualizando a liga id =>', this.match.league_id)
        const dataChamp: DataChampionship = this.dataChampionshipRepository.create(dataChampionship);
        const transformDataChamp: DataChampionship = await this.transformUpdateDataChampionship(dataChamp);
        currentSeasons.push(transformDataChamp);
        console.log('Update realizado...');
      }
    }
    await this.dataChampionshipRepository.insert(currentSeasons);
    console.log('data_championship atualizada com sucesso!');

    console.log('Chamando API de estatisticas...');
    await this.generateStatisticsData();
    console.log('Estisticas inseridas com sucesso!');
  }

  @Cron('30 04 * * *', {
    timeZone: 'America/Sao_Paulo',
  })
  async getDataChampionship(): Promise<void> {
    console.log('Iniciando a busca de data_championships...');
    const dataChampionship: DataChampionship = new DataChampionship();
    let total_pages: number = 1;
    const atualDate: string = new Date().toISOString().split('T')[0];

    for (let i: number = 1; i <= total_pages; i++) {
      const data_championship: any[] = [];
      const dataGames = await this.httpRequest.get(`v2.0/fixtures/between/2018-01-01/${atualDate}?api_token=${API_TOKEN}&page=${i}&include=stats,round,stage`, true);

      if (!dataGames) return;

      if (dataGames.meta.pagination && dataGames.meta.pagination.total_pages > 1) {
        total_pages = dataGames.meta.pagination.total_pages;
      }

      for (this.match of dataGames.data) {
        const dataChamp: DataChampionship = this.dataChampionshipRepository.create(dataChampionship);
        const transformDataChamp: DataChampionship = await this.transformDataChampionship(dataChamp);
        data_championship.push(transformDataChamp);
        console.log('Montando lotes para inserir na base...');
      }

      await this.dataChampionshipRepository.insert(data_championship);
      console.log('Salvo pagina =>', i);
    }

    //MLS
    total_pages = 1;
    const dateAtual: Date = new Date();
    const formatDate = dateAtual.setDate(dateAtual.getDate() + 1);
    const atualDatePlusOne: Date = new Date(formatDate);
    const atualDatePlusOneToGetFixtures: string = atualDatePlusOne.toISOString().split('T')[0];

    for (let i: number = 1; i <= total_pages; i++) {
      const data_championship: any[] = [];
      const dataGames = await this.httpRequest.get(`v2.0/fixtures/between/${atualDatePlusOneToGetFixtures}/2022-12-31?api_token=${API_TOKEN}&page=${i}&include=stats,round,stage`, true);

      if (!dataGames) return;

      if (dataGames.meta.pagination && dataGames.meta.pagination.total_pages > 1) {
        total_pages = dataGames.meta.pagination.total_pages;
      }

      const mlsMatches: never[] = dataGames.data.filter((league: any) => league.league_id === 779);

      for (this.match of mlsMatches) {
        const dataChamp: DataChampionship = this.dataChampionshipRepository.create(dataChampionship);
        const transformDataChamp: DataChampionship = await this.transformDataChampionship(dataChamp);
        data_championship.push(transformDataChamp);
        console.log('Montando lotes para inserir na base...');
      }

      await this.dataChampionshipRepository.insert(data_championship);
      console.log('Salvo pagina =>', i);
    }
  }

  @Cron('00 03 * * *', {
    timeZone: 'America/Sao_Paulo',
  })
  async getAllLeaguesSportMonks(): Promise<void> {
    console.log('Iniciando a busca pelas championships...')
    const allChampionship = [];
    const allLeagues = await this.httpRequest.get(`v2.0/leagues?api_token=${API_TOKEN}`);
    let id = 1;
    for (const championship of allLeagues) {
      const championshipCreated: Championship = ChampionshipCreator.create(championship);
      championshipCreated.id_team_monks = championshipCreated.id;
      allChampionship.push(championshipCreated);
      console.log('Salvando as championships...');
    }

    for (const championship of allChampionship) {
      championship.id = id;
      id++
    }

    await this.championshipRepository.insert(allChampionship);
    console.log('Championship inseridos com sucesso!');
  }

  @Cron('30 03 * * *', {
    timeZone: 'America/Sao_Paulo',
  })
  async getAllSeasonsSportMonks(): Promise<void> {
    console.log('Iniciando a busca pelas seasons...');
    const seasonsData = [];
    const seasonsIds = []

    const championships = await this.championshipRepository.find();

    for await (const championship of championships) {
      const { seasons } = await this.httpRequest.get(`v2.0/leagues/${championship.id_team_monks}?api_token=${API_TOKEN}&include=seasons`);
      seasonsIds.push(seasons.data.filter(
        (season) =>
          parseFloat(season.name.split("/")[0]) >= 2017
      ).map((id) => id.id));
    }

    const seasonIdsFlatten = flatten(seasonsIds);

    for (const id of seasonIdsFlatten) {
      const data = await this.httpRequest.get(`v2.0/seasons/${id}?api_token=${API_TOKEN}`);
      const season: Season = SeasonCreator.create(data);
      season.league_id_team_monks = data.league_id;
      season.period = data.name;
      seasonsData.push(season);
    }

    await this.seasonRepository.insert(seasonsData);
    console.log('Seasons inseridas com sucesso!');
  }

  async getRoundName(roundId: number) {
    const data = await this.httpRequest.get(`v2.0/rounds/${roundId}?api_token=${API_TOKEN}`);
    const name = data?.name;
    return name;
  }

  async transformUpdateDataChampionship(dataChamp: DataChampionship): Promise<DataChampionship> {
    dataChamp.team_1 = await this.getIdTeamOfSportMonks(this.match.localteam_id, this.match?.season_id);
    dataChamp.team_2 = await this.getIdTeamOfSportMonks(this.match.visitorteam_id, this.match?.season_id);
    dataChamp.home = 0;
    dataChamp.date_of_match = this.match.time.starting_at.date_time;
    dataChamp.used = 0;
    dataChamp.championship = await this.getIdChampionshipOfSportMonks(this.match.league_id);
    dataChamp.season = this.match?.season_id;
    dataChamp.score_team_1 = this.match.scores?.localteam_score;
    dataChamp.score_team_2 = this.match.scores?.visitorteam_score;
    dataChamp.id_match_sportmonks = this.match.id;

    const stageName = this.match?.stage?.data.name.toLowerCase();

    if (!this.match?.round?.data.name) {
      if (stageName === StageEnum.ROUND_OF_16) {
        dataChamp.round_name = 7
      } else if (stageName === StageEnum.QUARTER_FINALS) {
        dataChamp.round_name = 8
      } else if (stageName === StageEnum.SEMI_FINALS) {
        dataChamp.round_name = 9
      } else if (stageName === StageEnum.FINAL) {
        dataChamp.round_name = 10
      }
    } else {
      dataChamp.round_name = this.match.round_id ? await this.getRoundName(this.match.round_id) : null
    }

    if (this.match.stats.data.length > 0) {
      dataChamp.corners_team_1 = this.match.stats.data[0]?.corners;
      dataChamp.corners_team_2 = this.match.stats.data[1]?.corners;
      dataChamp.fouls_team_1 = this.match.stats.data[0]?.corners;
      dataChamp.fouls_team_2 = this.match.stats.data[1]?.corners;
      dataChamp.finalizations_team_1 = this.match.stats.data[0].shots?.total;
      dataChamp.finalizations_team_2 = this.match.stats.data[1].shots?.total;
      dataChamp.yellow_cards_team_1 = this.match.stats.data[0]?.yellowcards;
      dataChamp.yellow_cards_team_2 = this.match.stats.data[1]?.yellowcards;
      dataChamp.red_cards_team_1 = this.match.stats.data[0]?.redcards;
      dataChamp.red_cards_team_2 = this.match.stats.data[1]?.redcards;
    }

    return dataChamp;
  }

  async transformDataChampionship(dataChamp: DataChampionship): Promise<DataChampionship> {
    dataChamp.team_1 = await this.getIdTeamOfSportMonks(this.match.localteam_id, this.match?.season_id);
    dataChamp.team_2 = await this.getIdTeamOfSportMonks(this.match.visitorteam_id, this.match?.season_id);
    dataChamp.home = 0;
    dataChamp.date_of_match = this.match.time.starting_at.date_time;
    dataChamp.used = 0;
    dataChamp.championship = await this.getIdChampionshipOfSportMonks(this.match.league_id);
    dataChamp.season = this.match?.season_id;
    dataChamp.score_team_1 = this.match.scores?.localteam_score;
    dataChamp.score_team_2 = this.match.scores?.visitorteam_score;
    dataChamp.id_match_sportmonks = this.match.id;

    const stageName = this.match?.stage?.data.name.toLowerCase();

    if (!this.match?.round?.data.name) {
      if (stageName === StageEnum.ROUND_OF_16) {
        dataChamp.round_name = 7
      } else if (stageName === StageEnum.QUARTER_FINALS) {
        dataChamp.round_name = 8
      } else if (stageName === StageEnum.SEMI_FINALS) {
        dataChamp.round_name = 9
      } else if (stageName === StageEnum.FINAL) {
        dataChamp.round_name = 10
      }
    } else {
      dataChamp.round_name = this.match?.round?.data.name;
    }

    if (this.match.stats.data.length > 0) {
      dataChamp.corners_team_1 = this.match.stats.data[0]?.corners;
      dataChamp.corners_team_2 = this.match.stats.data[1]?.corners;
      dataChamp.fouls_team_1 = this.match.stats.data[0]?.corners;
      dataChamp.fouls_team_2 = this.match.stats.data[1]?.corners;
      dataChamp.finalizations_team_1 = this.match.stats.data[0].shots?.total;
      dataChamp.finalizations_team_2 = this.match.stats.data[1].shots?.total;
      dataChamp.yellow_cards_team_1 = this.match.stats.data[0]?.yellowcards;
      dataChamp.yellow_cards_team_2 = this.match.stats.data[1]?.yellowcards;
      dataChamp.red_cards_team_1 = this.match.stats.data[0]?.redcards;
      dataChamp.red_cards_team_2 = this.match.stats.data[1]?.redcards;
    }

    return dataChamp;
  }

  @Cron('00 04 * * *', {
    timeZone: 'America/Sao_Paulo',
  })
  async getTeamsBySeasonSportMonks(): Promise<void> {
    console.log('Iniciando a busca por times com base na season');
    let total_pages: number = 1;
    const teamsArr = [];

    for (let i: number = 1; i <= total_pages; i++) {
      const seasons = await this.httpRequest.get(`v2.0/seasons?api_token=${API_TOKEN}&page=${i}`, true);

      if (seasons.meta.pagination && seasons.meta.pagination.total_pages > 1) {
        total_pages = seasons.meta.pagination.total_pages;
      }

      for (const season of seasons.data) {
        const teams = await this.httpRequest.get(`v2.0/teams/season/${season.id}?api_token=${API_TOKEN}`);
        for (const team of teams) {
          const teamCreated: Team = TeamCreator.create(team);
          teamCreated.id_team_sport_monks = team.id;
          teamCreated.season_id = season.id;
          teamsArr.push(teamCreated);
          console.log('Feito push team =>', teamCreated.id);
        }
      }
    }
    await this.teamsRepository.insert(teamsArr);
    console.log('Salvo =>', teamsArr.length);
  }

  @Cron('30 02 * * *', {
    timeZone: 'America/Sao_Paulo',
  })
  public async truncateTables() {
    console.log('Deletando dados da tabela data_championship...');
    await this.dataChampionshipRepository.query(`truncate table data_championship cascade`);

    console.log('Deletando dados da tabela season...');
    await this.dataChampionshipRepository.query(`truncate table season cascade`);

    console.log('Deletando dados da tabela championship...');
    await this.dataChampionshipRepository.query(`truncate table championship cascade`);

    console.log('Deletando dados da tabela statistics...');
    await this.dataChampionshipRepository.query(`truncate table statistics cascade`);

    console.log('Deletando dados da tabela team...');
    await this.dataChampionshipRepository.query(`truncate table team cascade`);
  }

  public async generateStatisticsData() {
    await this.httpRequest.get(`${ENDPOINT_STATISTICS}/probabilities`);
  }
}
