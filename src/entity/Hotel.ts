import { Entity, PrimaryGeneratedColumn, Column, OneToMany, AfterLoad } from 'typeorm';
import { Business } from './Business';
import { Review } from './Review';
import { SearchQuery } from './SearchQuery';
import { HotelAmenities } from './HotelAmenities';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({nullable: true})
  url: string;

  @Column({nullable: true})
  wifi_name: string;

  @Column({ nullable: true} )
  wifi_password: string;

  @Column({nullable: true})
  front_desk_number: string;

  @Column({nullable: true})
  check_in_time: string;

  @Column({nullable: true})
  check_out_time: string;

  @Column({type: 'int', default: 0})
  rating: number;

  @Column({unique:true})
  chatBot_key: string;

  @OneToMany(() => Business, business => business.hotel)
  businesses: Business[];

  @OneToMany(() => SearchQuery, searchQuery => searchQuery.hotel)
  searchQueries: SearchQuery[];

  @OneToMany(()=> HotelAmenities, amenities => amenities.hotel)
  amenities: HotelAmenities[];

  @OneToMany(() => Review, review => review.hotel)
  reviews: Review[];

  @AfterLoad()
  updateRating(){
     if (this.reviews && this.reviews.length > 0){
      const totalRating = this.reviews.reduce((acc,curr) => acc + curr.rating, 0);
      const averageRating = totalRating / this.reviews.length;
      this.rating = Math.round(averageRating);
    } else {
      this.rating = 0;
    }
  }

}
