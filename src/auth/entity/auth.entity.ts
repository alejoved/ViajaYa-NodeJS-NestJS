import { Expose } from "class-transformer";
import { Role } from "src/common/role";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Auth {
  @Expose()
  @PrimaryColumn()
  identification: string;
  @Expose()
  @Column()
  password: string;
  @Expose()
  @Column()
  role: Role;
}