import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "../../auth/entity/auth.entity";
import { Expose } from "class-transformer";

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
    @OneToOne(() => Auth, (auth) => auth.email, {cascade: true})
    @JoinColumn({name: "auth_email"})
    auth: Auth;
}