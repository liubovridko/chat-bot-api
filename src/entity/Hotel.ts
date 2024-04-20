import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Business } from './Business';
import { SearchQuery } from './SearchQuery';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({nullable: true})
  url: string;

  @Column({nullable: true})
  description: string;

  @Column({type:'varchar', array: true, nullable: true} )
  keywords: string[];

  @Column({nullable: true})
  price: number;

  @Column({unique:true})
  chatBot_key: string;

  @OneToMany(() => Business, business => business.hotel)
  businesses: Business[];

  @OneToMany(() => SearchQuery, searchQuery => searchQuery.hotel)
  searchQueries: SearchQuery[];

}
