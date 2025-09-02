import { Expose } from "class-transformer";
import { Role } from "../../../common/role";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("auth")
export class AuthEntity {
  @Expose()
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Expose()
  @Column({ unique: true })
  email: string;
  @Expose()
  @Column()
  password?: string;
  @Expose()
  @Column()
  role?: Role;
}