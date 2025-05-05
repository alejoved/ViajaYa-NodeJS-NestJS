import { Role } from "src/utils/role";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Auth {
  @PrimaryColumn()
  identification: string;
  @Column()
  password: string;
  @Column()
  role: Role;
}