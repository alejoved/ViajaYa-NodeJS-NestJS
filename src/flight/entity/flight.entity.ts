import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";

@Entity()
export class Flight {
    @Expose()
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Expose()
    @Column()
    airline: string;
    @Expose()
    @Column()
    origin: string;
    @Expose()
    @Column()
    destiny: string;
    @Expose()
    @Column()
    departure: Date;
    @Expose()
    @Column()
    layovers: boolean;
    @Expose()
    @Column()
    price: number;

}