import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticsType } from 'src/@types/statistics.types';
import { Championship } from 'src/database/entities/championship.entity';
import { DataChampionship } from 'src/database/entities/datachampionship.entity';
import { Statistics } from 'src/database/entities/statistics.entity';
import { Team } from 'src/database/entities/team.entity';
import { Repository } from 'typeorm';
import { uniq, union, sortedUniq, uniqBy } from 'lodash';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Championship)
        private readonly championshipRepository: Repository<Championship>,
        @InjectRepository(Team)
        private readonly teamsRepository: Repository<Team>,
        @InjectRepository(DataChampionship)
        private readonly dataChampionshipRepository: Repository<DataChampionship>,
        @InjectRepository(Statistics)
        private readonly statisticsRepository: Repository<Statistics>,
    ) { }

    public async findTeamById(idTeam: number): Promise<Team> {
        console.log('Buscando o time pelo id => ', idTeam);
        return await this.teamsRepository.findOne({
            where: {
                id: idTeam
            }
        });
    }

    async findAllChampionships(): Promise<Championship[]> {
        console.log('Efetuando a busca de todos championships...');
        return await this.championshipRepository.find();

    }

    async findTeamsBySeasonId(idSeason: number): Promise<Team[]> {
        console.log('Efetuando a busca de times pela season...')
        return await this.teamsRepository.find({
            where: {
                season_id: idSeason
            }
        });

    }

    async findMatchesByIdChampionshipAndSeason(idChampionship: number, idSeason: number): Promise<DataChampionship[]> {
        console.log('Buscando partidas pelo id da championship e season...');
        const data = await this.dataChampionshipRepository.find({
            where: {
                championship: idChampionship,
                season: idSeason
            }
        })

        return uniqBy(data, 'id_match_sportmonks')
    }

    async findChampionshipById(idChampionship: number): Promise<Championship> {
        console.log('Buscando championship pelo id...');
        return await this.championshipRepository.findOne({
            where: {
                id: idChampionship
            }
        })
    }

    async findTeamsStatistics(seasonId: number): Promise<any> {
        const statistics = await this.dataChampionshipRepository.query(`
       SELECT *
            FROM "statistics" s
            JOIN data_championship dc 
            on dc.id = s.id 
            and dc.season  = ${seasonId}
       `)
        return this.transformStatistics(statistics);
    }

    /** 
     * Foi feito essa gambiarra desgraçada, porque nao consegui, pq nossa base nao tem relacao, entao
     * nao da pra fazer relations com o typeorm
    */
    private transformStatistics(statistics: any[]): Statistics[] {
        for (const statistic of statistics) {
            statistic.both_score = +statistic.both_score.toFixed(3)
            statistic.win_team_1 = +statistic.win_team_1.toFixed(3)
            statistic.win_team_2 = +statistic.win_team_2.toFixed(3)
            statistic.score_gt_5_5_team_2 = +statistic.score_gt_5_5_team_2.toFixed(3)
            statistic.score_gt_5_5_team_1 = +statistic.score_gt_5_5_team_1.toFixed(3)
            statistic.score_gt_5_5 = +statistic.score_gt_5_5.toFixed(3)
            statistic.score_gt_4_5_team_2 = +statistic.score_gt_4_5_team_2.toFixed(3)
            statistic.score_gt_4_5_team_1 = +statistic.score_gt_4_5_team_1.toFixed(3)
            statistic.score_gt_4_5 = +statistic.score_gt_4_5.toFixed(3)
            statistic.score_gt_3_5_team_2 = +statistic.score_gt_3_5_team_2.toFixed(3)
            statistic.score_gt_3_5_team_1 = +statistic.score_gt_3_5_team_1.toFixed(3)
            statistic.score_gt_3_5 = +statistic.score_gt_3_5.toFixed(3)
            statistic.score_gt_2_5_team_2 = +statistic.score_gt_2_5_team_2.toFixed(3)
            statistic.score_gt_2_5_team_1 = +statistic.score_gt_2_5_team_1.toFixed(3)
            statistic.score_gt_2_5 = +statistic.score_gt_2_5.toFixed(3)
            statistic.score_gt_1_5_team_2 = +statistic.score_gt_1_5_team_2.toFixed(3)
            statistic.score_gt_1_5_team_1 = +statistic.score_gt_1_5_team_1.toFixed(3)
            statistic.score_gt_1_5 = +statistic.score_gt_1_5.toFixed(3)
            statistic.score_gt_0_5_team_2 = +statistic.score_gt_0_5_team_2.toFixed(3)
            statistic.score_gt_0_5_team_1 = +statistic.score_gt_0_5_team_1.toFixed(3)
            statistic.score_gt_0_5 = +statistic.score_gt_0_5.toFixed(3)
            statistic.draw = +statistic.draw.toFixed(3)
            statistic.corner_gt_9_team_2 = +statistic.corner_gt_9_team_2.toFixed(3)
            statistic.corner_gt_9_team_1 = +statistic.corner_gt_9_team_1.toFixed(3)
            statistic.corner_gt_8 = +statistic.corner_gt_8.toFixed(3)
            statistic.corner_gt_9 = +statistic.corner_gt_8.toFixed(3)
            statistic.corner_gt_8_team_2 = +statistic.corner_gt_8_team_2.toFixed(3)
            statistic.corner_gt_8_team_1 = +statistic.corner_gt_8_team_1.toFixed(3)
            statistic.corner_gt_7 = +statistic.corner_gt_7.toFixed(3)
            statistic.corner_gt_7_team_2 = +statistic.corner_gt_7_team_2.toFixed(3)
            statistic.corner_gt_7_team_1 = +statistic.corner_gt_7_team_1.toFixed(3)
            statistic.corner_gt_6 = +statistic.corner_gt_6.toFixed(3)
            statistic.corner_gt_6_team_2 = +statistic.corner_gt_6_team_2.toFixed(3)
            statistic.corner_gt_6_team_1 = +statistic.corner_gt_6_team_1.toFixed(3)
            statistic.corner_gt_5 = +statistic.corner_gt_5.toFixed(3)
            statistic.corner_gt_5_team_2 = +statistic.corner_gt_5_team_2.toFixed(3)
            statistic.corner_gt_5_team_1 = +statistic.corner_gt_5_team_1.toFixed(3)
            statistic.corner_gt_4 = +statistic.corner_gt_4.toFixed(3)
            statistic.corner_gt_4_team_2 = +statistic.corner_gt_4_team_2.toFixed(3)
            statistic.corner_gt_4_team_1 = +statistic.corner_gt_4_team_1.toFixed(3)
            statistic.corner_gt_3_team_2 = +statistic.corner_gt_3_team_2.toFixed(3)
            statistic.corner_gt_3_team_1 = +statistic.corner_gt_3_team_1.toFixed(3)
            statistic.corner_gt_2_team_2 = +statistic.corner_gt_2_team_2.toFixed(3)
            statistic.corner_gt_2_team_1 = +statistic.corner_gt_2_team_1.toFixed(3)
            statistic.corner_gt_1_team_2 = +statistic.corner_gt_1_team_2.toFixed(3)
            statistic.corner_gt_1_team_1 = +statistic.corner_gt_1_team_1.toFixed(3)
            statistic.corner_gt_10 = +statistic.corner_gt_10.toFixed(3)
            statistic.corner_gt_10_team_2 = +statistic.corner_gt_10_team_2.toFixed(3)
            statistic.corner_gt_10_team_1 = +statistic.corner_gt_10_team_1.toFixed(3)
            statistic.corner_gt_11 = +statistic.corner_gt_11.toFixed(3)
            statistic.corner_gt_12 = +statistic.corner_gt_12.toFixed(3)
            statistic.corner_gt_13 = +statistic.corner_gt_13.toFixed(3)
            statistic.corner_gt_14 = +statistic.corner_gt_14.toFixed(3)
            statistic.corner_gt_15 = +statistic.corner_gt_15.toFixed(3)
            statistic.corner_gt_16 = +statistic.corner_gt_16.toFixed(3)
            statistic.corner_gt_17 = +statistic.corner_gt_17.toFixed(3)
            statistic.corner_gt_18 = +statistic.corner_gt_18.toFixed(3)

            return statistics;
        }
    }
}
