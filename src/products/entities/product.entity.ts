import {Product} from "@prisma/client"; 

export class ProductEntity implements Product{

 
    id: number;
    productName: string;
    price: number;
    stockQuantity: number;
    description: string;

}
