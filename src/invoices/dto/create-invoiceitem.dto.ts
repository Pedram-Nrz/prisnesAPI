import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class CreateInvoiceItemDto {

    @IsNumber()
    @ApiProperty()
    productId: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    quantity: number;

    @IsNumber()
    @Min(0.0)
    @Max(0.9)
    @ApiProperty()
    itemDiscount: number;

    
}