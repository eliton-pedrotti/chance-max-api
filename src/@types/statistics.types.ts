import { DataChampionship } from "src/database/entities/datachampionship.entity";
import { Statistics } from "src/database/entities/statistics.entity";


export type StatisticsType = {
    data_championship: DataChampionship;
    statistics: Statistics;
}