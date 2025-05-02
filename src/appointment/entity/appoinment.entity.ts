import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    reason: string;
    @Column()
    dateAndHour: Date;

}