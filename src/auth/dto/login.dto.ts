import { IsNotEmpty, IsString } from "class-validator";

export class LoginDTO{
    @IsNotEmpty()
    @IsString()
    identification: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}