import { Expose } from "class-transformer";
import { AuthCommand } from "./auth-command";

export class CustomerUpdateCommand{
    @Expose()
    identification: string;
    @Expose()
    name: string;
    @Expose()
    auth: AuthCommand;
}