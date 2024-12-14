import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class CreateInvoiceDto {

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    userId: number;
 

    @IsNumber()
    @Min(0.0)
    @ApiProperty()
    totalAmount: number;

    @IsOptional()
    @IsNumber()
    @Min(0.0)
    @Max(0.9)
    @ApiProperty()
    invoiceDiscount?: number;
 

}
