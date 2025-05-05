import { Expose } from "class-transformer";

export class RegisterResponseDTO{
    @Expose()
    identification: string;
}