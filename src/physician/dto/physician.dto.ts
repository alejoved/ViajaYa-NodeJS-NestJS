import { IsString } from "class-validator";

export class PhysicianDTO{
    @IsString()
    identification: string;
    @IsString()
    password: string;
    @IsString()
    name: string;
    @IsString()
    code: string;
    @IsString()
    speciality: string;
}