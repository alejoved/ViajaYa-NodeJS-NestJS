import { Expose } from "class-transformer";
import { Customer } from "src/customer/entity/customer.entity";
import { Flight } from "src/flight/entity/flight.entity";
import { Hotel } from "src/hotel/entity/hotel.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Expose()
    @Column({ type: 'timestamp', nullable: false })
    reservationDate: Date;
    @Expose()
    @Column()
    status: string;
    @Expose()
    @Column()
    numberNights: string;
    @Expose()
    @Column()
    total: number;

    @ManyToOne(() => Customer, (customer) => customer.id, {cascade: true})
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => Flight, (flight) => flight.id, {cascade: true})
    @JoinColumn({ name: 'flight_id' })
    flight: Flight;

    @ManyToOne(() => Hotel, (hotel) => hotel.id, {cascade: true})
    @JoinColumn({ name: 'hotel_id' })
    hotel: Hotel;

}