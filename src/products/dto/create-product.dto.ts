import { ApiProperty } from "@nestjs/swagger";
import {IsAlphanumeric, IsInt, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateProductDto{

    @IsString()
    @ApiProperty()
    readonly productName: string;

    @IsNumber()
    @ApiProperty()
    readonly price: number;

    @IsInt()
    @ApiProperty()
    readonly stockQuantity: number;
    
    @IsOptional()
    @IsAlphanumeric()
    @ApiProperty({required:false, nullable:true})
    readonly description?: string;

}
