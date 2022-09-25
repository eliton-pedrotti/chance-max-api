import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  id_team_sport_monks: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  season_id: number;

  @Column({ nullable: true, name: 'logo_url' })
  logo_path: string;
}

export class TeamCreator {
  public static create(source: Team): Team {
    return Object.assign(new Team(), source);
  }
}