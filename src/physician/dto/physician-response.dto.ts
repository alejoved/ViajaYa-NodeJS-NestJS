import { Expose } from "class-transformer";

export class PhysicianResponseDTO{
    @Expose()
    name: string;
    @Expose()
    code: string;
    @Expose()
    speciality: string;
}