import { IsNotEmpty, IsString } from "class-validator";

export class RegisterDTO{
    @IsNotEmpty()
    @IsString()
    identification: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}