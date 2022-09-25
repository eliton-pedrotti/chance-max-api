import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DataChampionship } from './datachampionship.entity';

@Entity()
export class Statistics {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => DataChampionship)
  @JoinColumn({ name: 'id' })
  data_championship_id: number;

  @Column({ type: 'double precision' })
  win_team_1: number;

  @Column({ type: 'double precision' })
  win_team_2: number;

  @Column({ type: 'double precision' })
  draw: number;

  @Column({ type: 'double precision' })
  both_score: number;

  @Column({ type: 'double precision' })
  score_gt_0_5: number;

  @Column({ type: 'double precision' })
  score_gt_1_5: number;

  @Column({ type: 'double precision' })
  score_gt_2_5: number;

  @Column({ type: 'double precision' })
  score_gt_3_5: number;

  @Column({ type: 'double precision' })
  score_gt_4_5: number;

  @Column({ type: 'double precision' })
  score_gt_5_5: number;

  @Column({ type: 'double precision' })
  score_gt_0_5_team_1: number;

  @Column({ type: 'double precision' })
  score_gt_1_5_team_1: number;

  @Column({ type: 'double precision' })
  score_gt_2_5_team_1: number;

  @Column({ type: 'double precision' })
  score_gt_3_5_team_1: number;

  @Column({ type: 'double precision' })
  score_gt_4_5_team_1: number;

  @Column({ type: 'double precision' })
  score_gt_5_5_team_1: number;

  @Column({ type: 'double precision' })
  score_gt_0_5_team_2: number;

  @Column({ type: 'double precision' })
  score_gt_1_5_team_2: number;

  @Column({ type: 'double precision' })
  score_gt_2_5_team_2: number;

  @Column({ type: 'double precision' })
  score_gt_3_5_team_2: number;

  @Column({ type: 'double precision' })
  score_gt_4_5_team_2: number;

  @Column({ type: 'double precision' })
  score_gt_5_5_team_2: number;

  @Column({ type: 'double precision' })
  corner_gt_4: number;

  @Column({ type: 'double precision' })
  corner_gt_5: number;

  @Column({ type: 'double precision' })
  corner_gt_6: number;

  @Column({ type: 'double precision' })
  corner_gt_7: number;

  @Column({ type: 'double precision' })
  corner_gt_8: number;

  @Column({ type: 'double precision' })
  corner_gt_9: number;

  @Column({ type: 'double precision' })
  corner_gt_10: number;

  @Column({ type: 'double precision' })
  corner_gt_11: number;

  @Column({ type: 'double precision' })
  corner_gt_12: number;

  @Column({ type: 'double precision' })
  corner_gt_13: number;

  @Column({ type: 'double precision' })
  corner_gt_14: number;

  @Column({ type: 'double precision' })
  corner_gt_15: number;

  @Column({ type: 'double precision' })
  corner_gt_16: number;

  @Column({ type: 'double precision' })
  corner_gt_17: number;

  @Column({ type: 'double precision' })
  corner_gt_18: number;
  
  @Column({ type: 'double precision' })
  corner_gt_1_team_1: number;
  
  @Column({ type: 'double precision' })
  corner_gt_2_team_1: number;
  
  @Column({ type: 'double precision' })
  corner_gt_3_team_1: number;
  
  @Column({ type: 'double precision' })
  corner_gt_4_team_1: number;
  
  @Column({ type: 'double precision' })
  corner_gt_5_team_1: number;
  
  @Column({ type: 'double precision' })
  corner_gt_6_team_1: number;
  
  @Column({ type: 'double precision' })
  corner_gt_7_team_1: number;
  
  @Column({ type: 'double precision' })
  corner_gt_8_team_1: number;
  
  @Column({ type: 'double precision' })
  corner_gt_9_team_1: number;
  
  @Column({ type: 'double precision' })
  corner_gt_10_team_1: number;
  
  @Column({ type: 'double precision' })
  corner_gt_1_team_2: number;
  
  @Column({ type: 'double precision' })
  corner_gt_2_team_2: number;
  
  @Column({ type: 'double precision' })
  corner_gt_3_team_2: number;
  
  @Column({ type: 'double precision' })
  corner_gt_4_team_2: number;
  
  @Column({ type: 'double precision' })
  corner_gt_5_team_2: number;
  
  @Column({ type: 'double precision' })
  corner_gt_6_team_2: number;
  
  @Column({ type: 'double precision' })
  corner_gt_7_team_2: number;

  @Column({ type: 'double precision' })
  corner_gt_8_team_2: number;

  @Column({ type: 'double precision' })
  corner_gt_9_team_2: number;

  @Column({ type: 'double precision' })
  corner_gt_10_team_2: number;
}
