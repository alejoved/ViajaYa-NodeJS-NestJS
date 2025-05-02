import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "../../auth/entity/auth.entity";

@Entity()
export class Patient {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    insurance: string;
    @OneToOne(() => Auth, (auth) => auth.identification, {cascade: true})
    @JoinColumn()
    auth: Auth;

}