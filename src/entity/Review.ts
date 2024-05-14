import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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
}