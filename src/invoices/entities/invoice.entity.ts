import {Invoice} from "@prisma/client";

export class InvoiceEntity implements Invoice {
    id: number;
    userId: number;
    totalAmount: number;
    invoiceDiscount: number;
    invoiceDate: Date;
    updatedAt: Date;
}
