import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../../../common/status";
import { Customer } from "../../../customer/infrastructure/entity/customer";
import { Flight } from "../../../flight/infrastructure/entity/flight";
import { Hotel } from "../../../hotel/infrastructure/entity/hotel";

@Entity("reservation")
export class Reservation {
    @PrimaryGeneratedColumn("uuid")
    id?: string;
    @Column({ type: 'timestamp', nullable: false })
    reservationDate: Date;
    @Column()
    status: Status;
    @Column()
    numberNights: number;
    @Column("float")
    total: number;

    @ManyToOne(() => Customer, (customer) => customer.id, {cascade: true, onDelete: "CASCADE"})
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => Flight, (flight) => flight.id, {cascade: true, onDelete: "CASCADE"})
    @JoinColumn({ name: 'flight_id' })
    flight: Flight;

    @ManyToOne(() => Hotel, (hotel) => hotel.id, {cascade: true, onDelete: "CASCADE"})
    @JoinColumn({ name: 'hotel_id' })
    hotel: Hotel;

}