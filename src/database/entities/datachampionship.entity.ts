import { typeField } from 'src/enums/type-field.enum';
import { typeUsed } from 'src/enums/type-used.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Season } from './season.entity';
@Entity()
export class DataChampionship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  team_1: number;

  @Column({ nullable: true })
  team_2: number;

  @Column({ nullable: true })
  championship: number;

  @Column()
  home: typeField;

  @Column({ nullable: true })
  score_team_1: number;

  @Column({ nullable: true })
  score_team_2: number;

  @Column({ nullable: true })
  date_of_match: string;

  @Column({ nullable: true })
  used: typeUsed;

  @Column({ nullable: true })
  corners_team_1: number;

  @Column({ nullable: true })
  corners_team_2: number;

  @Column({ nullable: true })
  fouls_team_1: number;

  @Column({ nullable: true })
  fouls_team_2: number;

  @Column({ nullable: true })
  yellow_cards_team_1: number;

  @Column({ nullable: true })
  yellow_cards_team_2: number;

  @Column({ nullable: true })
  red_cards_team_1: number;

  @Column({ nullable: true })
  red_cards_team_2: number;

  @Column({ nullable: true })
  finalizations_team_1: number;

  @Column({ nullable: true })
  finalizations_team_2: number;

  @Column({ nullable: true })
  season: number;

  @Column({ nullable: true })
  round_name: number;

  @Column({ nullable: true })
  id_match_sportmonks: number;

}
