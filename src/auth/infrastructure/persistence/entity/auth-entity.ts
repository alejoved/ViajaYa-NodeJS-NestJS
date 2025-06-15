import { Expose } from "class-transformer";
import { Role } from "../../../../common/role";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("auth")
export class AuthEntity {
  @Expose()
  @PrimaryColumn()
  email: string;
  @Expose()
  @Column()
  password: string;
  @Expose()
  @Column()
  role?: Role;
}