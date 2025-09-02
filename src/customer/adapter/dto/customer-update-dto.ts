import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CustomerUpdateDto{
    @ApiProperty({ description: "Customer identification" })
    @IsNotEmpty()
    @IsString()
    identification: string;
    @ApiProperty({ description: "Customer full name" })
    @IsNotEmpty()
    @IsString()
    name: string;
}