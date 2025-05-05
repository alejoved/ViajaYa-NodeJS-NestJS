import { IsString } from "class-validator";

export class LoginDTO{
    @IsString()
    identification: string;
    @IsString()
    password: string;
}