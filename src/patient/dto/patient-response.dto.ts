import { Expose } from "class-transformer";

export class PatientResponseDTO{
    @Expose()
    name: string;
    @Expose()
    insurance: string;
}