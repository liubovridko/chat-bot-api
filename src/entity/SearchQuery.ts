import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Hotel } from './Hotel';

@Entity('search_query')
export class SearchQuery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Hotel, hotel => hotel.searchQueries)
  @JoinColumn({ name: 'hotelId' })
  hotel: Hotel;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
