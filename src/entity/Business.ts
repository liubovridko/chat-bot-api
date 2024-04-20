import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   JoinColumn,
 } from 'typeorm';
 import { Category } from './Category';
 import { Hotel } from './Hotel';
 
 @Entity()
 export class Business {
   @PrimaryGeneratedColumn()
   id: number;
 
   @Column({nullable: true})
   title: string;
 
   @Column({nullable: true})
   url: string;
 
   @Column({nullable: true})
   image: string;
 
   @Column({nullable: true})
   description: string;
 
   @Column({ type:'varchar', array: true, nullable: true })
   keywords: string[];
 
   @Column({nullable: true})
   price: number;
 
   @ManyToOne(() => Category, category => category.businesses)
   @JoinColumn({ name: 'categoryId' })
   category: Category;
 
   @Column()
   categoryId: number;

   @ManyToOne(() => Hotel, hotel => hotel.businesses)
   @JoinColumn({ name: 'hotelId' })
   hotel: Hotel;
 
   @Column()
   hotelId: number;
 }
 