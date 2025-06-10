import { Expose } from "class-transformer";

export class RegisterCommand{
    @Expose()
    email: string;
    @Expose()
    password: string;
}