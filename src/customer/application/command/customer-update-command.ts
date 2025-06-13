import { AuthCommand } from "./auth-command";

export class CustomerUpdateCommand{
    identification: string;
    name: string;
    auth: AuthCommand;
}