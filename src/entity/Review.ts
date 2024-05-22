import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, AfterInsert } from 'typeorm';
import { AppDataSource } from "../data-source";
import { Hotel } from './Hotel';

@Entity()
export class Review {
@PrimaryGeneratedColumn()
id: number;

@Column()
userName: string;

@Column()
textReview: string;

@Column({nullable: true})
rating: number

@ManyToOne(()=> Hotel, hotel=> hotel.reviews)
@JoinColumn({name: 'hotelId'})
hotel: Hotel

@Column()
hotelId: number;

@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
createdAt: Date;

// Lifecycle hook to update the hotel rating after a new review is inserted
@AfterInsert()
   async updateHotelRating():Promise<void>{
      const hotelRepository = AppDataSource.getRepository(Hotel);
      const hotel = await hotelRepository.findOne({ where: { id: this.hotelId }, relations: ['reviews'] });
      
      if (hotel && this.rating !== null) {
      hotel.updateRating(this.rating);
      await hotelRepository.save(hotel); // Save the hotel to persist the updated rating
      }
   }

}