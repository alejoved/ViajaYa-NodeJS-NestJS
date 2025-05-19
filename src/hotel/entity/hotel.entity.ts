import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";

@Entity()
export class Hotel {
    @Expose()
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Expose()
    @Column()
    name: string;
    @Expose()
    @Column()
    country: string;
    @Expose()
    @Column()
    city: string;
    @Expose()
    @Column()
    category: string;
    @Expose()
    @Column()
    pricePerNight: number;
}