import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
@Entity()
export class Season {
  @PrimaryColumn()
  id: number;

  @Column()
  period: string;

  @Column()
  is_current_season: boolean;

  @Column({ nullable: true })
  current_round_id: number;

  @Column({ nullable: true })
  league_id_team_monks: number;
}

export class SeasonCreator {
  public static create(source: Season): Season {
    return Object.assign(new Season(), source);
  }
}
