import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   JoinColumn,
 } from 'typeorm';
 import { Hotel } from './Hotel';

@Entity('hotel_amenities')
export class HotelAmenities {
   @PrimaryGeneratedColumn()
   id:number;

   @Column()
   amenity_type:string;

   @Column({default:true})
   available: boolean;

   @Column()
   hours:string;

   @ManyToOne(()=> Hotel, hotel => hotel.amenities)
   @JoinColumn({name: 'hotelId'})
   hotel: Hotel

   @Column()
   hotelId: number;
}