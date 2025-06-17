import { ApiProperty } from "@nestjs/swagger";

export class CustomerResponseDTO{
    @ApiProperty({ description: "Customer ID" })
    id: string;
    @ApiProperty({ description: "Customer full name" })
    name: string;
    @ApiProperty({ description: "Customer identification" })
    identification: string;
    @ApiProperty({ description: "Customer email" })
    email: string;
}