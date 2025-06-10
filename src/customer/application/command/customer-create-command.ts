import { Expose } from "class-transformer";
import { AuthCommand } from "./auth-command";

export class CustomerCreateCommand{
    @Expose()
    identification: string;
    @Expose()
    password: string;
    @Expose()
    name: string;
    @Expose()
    auth: AuthCommand;
}