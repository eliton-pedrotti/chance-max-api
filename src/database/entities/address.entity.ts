import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  CEP: string;

  @Column()
  street: string;

  @Column()
  district: string;

  @Column()
  number_address: number;

  @Column()
  complement: string;

  @Column()
  city: string;

  @Column()
  state: string;
}
