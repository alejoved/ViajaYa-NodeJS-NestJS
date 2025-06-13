import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";

@Entity()
export class Flight {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    airline: string;
    @Column()
    origin: string;
    @Column()
    destiny: string;
    @Column()
    departure: Date;
    @Column()
    layovers: boolean;
    @Column("float")
    price: number;

}