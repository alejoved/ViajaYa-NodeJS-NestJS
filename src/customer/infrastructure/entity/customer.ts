import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";
import { Auth } from "../../../auth/infrastructure/entity/auth";

@Entity("customer")
export class Customer {
    @Expose()
    @PrimaryGeneratedColumn("uuid")
    id?: string;
    @Expose()
    @Column()
    identification: string;
    @Expose()
    @Column()
    name: string;
    @Expose()
    @OneToOne(() => Auth, (auth) => auth.email)
    @JoinColumn({name: "auth_email"})
    auth: Auth;
}