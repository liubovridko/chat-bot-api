import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Business } from './Business';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Business, business => business.category)
  businesses: Business[];
}
