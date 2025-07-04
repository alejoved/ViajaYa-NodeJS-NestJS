import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("hotel")
export class Hotel {
    @PrimaryGeneratedColumn("uuid")
    id?: string;
    @Column()
    name: string;
    @Column()
    country: string;
    @Column()
    city: string;
    @Column()
    category: string;
    @Column()
    pricePerNight: number;
}