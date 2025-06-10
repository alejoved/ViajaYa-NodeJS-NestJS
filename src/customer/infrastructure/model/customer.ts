import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";
import { Auth } from "../../../auth/infrastructure/model/auth";

@Entity()
export class Customer {
    @Expose()
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Expose()
    @Column()
    identification: string;
    @Expose()
    @Column()
    name: string;
    @Expose()
    @OneToOne(() => Auth, (auth) => auth.email, {cascade: true, onDelete: "CASCADE"})
    @JoinColumn({name: "auth_email"})
    auth: Auth;
}