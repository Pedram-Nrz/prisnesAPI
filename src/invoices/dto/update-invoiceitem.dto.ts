import { PartialType } from '@nestjs/swagger';
import { CreateInvoiceItemDto } from './create-invoiceitem.dto';

export class UpdateInvoiceItemDto extends PartialType(CreateInvoiceItemDto) {}