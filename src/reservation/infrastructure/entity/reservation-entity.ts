import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../../../common/status";
import { CustomerEntity } from "../../../customer/infrastructure/entity/customer-entity";
import { FlightEntity } from "../../../flight/infrastructure/entity/flight-entity";
import { HotelEntity } from "../../../hotel/infrastructure/entity/hotel-entity";

@Entity("reservation")
export class ReservationEntity {
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

    @ManyToOne(() => CustomerEntity, (customerEntity) => customerEntity.id, { cascade: true, eager: true })
    @JoinColumn({ name: 'customer_id' })
    customerEntity?: CustomerEntity;

    @ManyToOne(() => FlightEntity, (flightEntity) => flightEntity.id, { cascade: true, eager: true })
    @JoinColumn({ name: 'flight_id' })
    flightEntity?: FlightEntity;

    @ManyToOne(() => HotelEntity, (hotelEntity) => hotelEntity.id, { cascade: true, eager: true })
    @JoinColumn({ name: 'hotel_id' })
    hotelEntity?: HotelEntity;

}