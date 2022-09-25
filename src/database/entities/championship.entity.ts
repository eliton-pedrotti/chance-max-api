import { Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { DataChampionship } from './datachampionship.entity';

@Entity()
export class Championship {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  id_team_monks: number;

  @Column({ nullable: true, name: 'url_logo' })
  logo_path: string;

  @Column({ nullable: true })
  current_season_id: number;
}

export class ChampionshipCreator {
  public static create(source: Championship): Championship {
    return Object.assign(new Championship(), source);
  }
}