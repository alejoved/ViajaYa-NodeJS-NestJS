import { IsNotEmpty, IsString } from "class-validator";

export class PhysicianDTO{
    @IsNotEmpty()
    @IsString()
    identification: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    code: string;
    @IsNotEmpty()
    @IsString()
    speciality: string;
}