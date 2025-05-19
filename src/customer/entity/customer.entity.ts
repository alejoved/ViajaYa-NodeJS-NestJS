import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "../../auth/entity/auth.entity";
import { Expose } from "class-transformer";

@Entity()
export class Customer {
    @Expose()
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Expose()
    @Column({ unique: true })
    identification: string;
    @Expose()
    @Column()
    name: string;
    @Expose()
    @Column({ unique: true })
    email: string;
    @Expose()
    @Column()
    password: string;
    @Expose()
    @OneToOne(() => Auth, (auth) => auth.email, {cascade: true})
    @JoinColumn()
    auth: Auth;
}