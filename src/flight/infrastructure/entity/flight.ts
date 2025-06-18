import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("flight")
export class Flight {
    @PrimaryGeneratedColumn("uuid")
    id?: string;
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