import { AuthCommand } from "./auth-command";

export class CustomerCreateCommand{
    identification: string;
    password: string;
    name: string;
    auth: AuthCommand;
}