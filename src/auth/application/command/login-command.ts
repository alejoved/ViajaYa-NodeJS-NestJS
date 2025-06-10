import { Expose } from "class-transformer";

export class LoginCommand{
    @Expose()
    email: string;
    @Expose()
    password: string;
}