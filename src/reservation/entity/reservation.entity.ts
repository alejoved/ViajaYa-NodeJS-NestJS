import { Expose } from "class-transformer";
import { Customer } from "../../customer/entity/customer.entity";
import { Flight } from "../../flight/entity/flight.entity";
import { Hotel } from "../../hotel/entity/hotel.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../../common/status";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Expose()
    @Column({ type: 'timestamp', nullable: false })
    reservationDate: Date;
    @Expose()
    @Column()
    status: Status;
    @Expose()
    @Column()
    numberNights: number;
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