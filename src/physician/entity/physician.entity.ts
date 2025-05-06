import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "../../auth/entity/auth.entity";
import { Expose } from "class-transformer";

@Entity()
export class Physician {
    @Expose()
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Expose()
    @Column()
    name: string;
    @Expose()
    @Column({ unique: true })
    code: string;
    @Expose()
    @Column()
    speciality: string;
    @Expose()
    @OneToOne(() => Auth, (auth) => auth.identification, {cascade: true})
    @JoinColumn()
    auth: Auth;
}