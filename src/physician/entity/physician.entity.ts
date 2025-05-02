import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "../../auth/entity/auth.entity";

@Entity()
export class Physician {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    code: string;
    @Column()
    speciality: string;
    @OneToOne(() => Auth, (auth) => auth.identification, {cascade: true})
    @JoinColumn()
    auth: Auth;
}