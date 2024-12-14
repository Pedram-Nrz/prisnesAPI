import {InvoiceItems} from "@prisma/client";

export class InvoiceItemEntity implements InvoiceItems {
    id: number;
    invoiceId: number;
    productId: number;
    quantity: number;
    itemDiscount: number;
    
}