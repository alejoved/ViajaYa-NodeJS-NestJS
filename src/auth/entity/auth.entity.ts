import { Rol } from "src/utils/rol";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth {
  @PrimaryColumn()
  identification: string;
  @Column()
  password: string;
  @Column()
  rol: Rol;
}