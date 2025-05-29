import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { AuthResponseDTO } from "../../auth/dto/auth-response.dto";

export class CustomerResponseDTO{
    @ApiProperty({ description: "Customer full name" })
    @Expose()
    name: string;
    @ApiProperty({ description: "Customer identification" })
    @Expose()
    identification: string;
    @ApiProperty({ description: "Customer authentication data" })
    @Expose()
    @Type(() => AuthResponseDTO)
    auth: AuthResponseDTO;
}