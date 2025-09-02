import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";
import { AuthEntity } from "../../../auth/infrastructure/entity/auth-entity";

@Entity("customer")
export class CustomerEntity {
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
    @OneToOne(() => AuthEntity, (authEntity) => authEntity.id, { cascade: true, eager: true })
    @JoinColumn({name: "auth_id"})
    authEntity: AuthEntity;
}