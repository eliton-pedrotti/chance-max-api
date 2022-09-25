import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Card {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    card_number: string;

    @Column({ nullable: true })
    card_name: string;

    @Column({ nullable: true })
    exp_month: string;

    @Column({ nullable: true })
    exp_year: string;

    @Column({ nullable: true })
    security_code: string;
}