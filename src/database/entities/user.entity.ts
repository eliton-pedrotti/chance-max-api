import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address.entity';
import { Card } from './card.entity';
import { Plan } from './plan.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cpf: string;

  @Column()
  birthday: string;

  @Column()
  phone: string;

  @Column()
  day_of_subscription: string;

  @Column()
  day_of_expiration: string;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address: Address;

  @OneToOne(() => Card, { cascade: true })
  @JoinColumn()
  card: Card;

  @Column()
  plan: number;

  @Column()
  isActive: number;
}

export class UserCreator {
  public static create(source: User): User {
    return Object.assign(new User(), source);
  }
}