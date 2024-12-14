import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvoiceItemDto } from './dto/create-invoiceitem.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoiceitem.dto';
import {getInoviceTotalAmount} from "@prisma/client/sql";

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma : PrismaService){}

  async create(createInvoiceDto : CreateInvoiceDto){
    return await this.prisma.invoice.create({data:createInvoiceDto, include:{invoiceItems:true, user:false}});
  }

  async addItem(id:number, createInvoiceItemDto: CreateInvoiceItemDto) {
    return await this.manageInvoiceItem("add",createInvoiceItemDto.productId,id,createInvoiceItemDto.quantity, createInvoiceItemDto.itemDiscount);
  }

  async findAll() {
    return await this.prisma.invoice.findMany({include:{invoiceItems:true, user:false}});
  }

  async findOne(id: number) {
    return await this.prisma.invoice.findUnique({where:{id},include:{invoiceItems:true, user:false}});
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    const {userId, totalAmount, ...updateValues} = updateInvoiceDto;
    return await this.prisma.invoice.update({where:{id}, data:updateValues});
  }

  async updateItem(id: number, itemId:number, updateInvoiceItemDto: UpdateInvoiceItemDto) { 
    return await this.manageInvoiceItem("update",null,id,updateInvoiceItemDto?.quantity || null, updateInvoiceItemDto?.itemDiscount ?? null,itemId);
  }

  async remove(id: number) {
    return await this.prisma.invoice.delete({where:{id},include:{invoiceItems:true, user:false}});
  }

  async removeItem(id: number, itemId:number) {
    const invoiceItem = await this.prisma.invoiceItems.findUnique({where:{invoiceId:id, id:itemId}});
    if(invoiceItem)
      return await this.manageInvoiceItem("remove",null,id,invoiceItem.quantity, invoiceItem.itemDiscount,invoiceItem.id);
    else 
      throw new NotFoundException();
  }

  private async manageInvoiceItem(
    action: 'add' | 'remove' | 'update',
    productId: number | null,
    invoiceId: number,
    quantity: number | null,
    itemDiscount: number | null,
    invoiceItemId?:number
  ) {
    switch (action) {
      case 'add':
        // Add the new invoice item
        await this.prisma.invoiceItems.create({
          data: {
            productId: productId,
            invoiceId: invoiceId,
            quantity: quantity,
            itemDiscount: itemDiscount,
          },
        });
        break;
  
      case 'remove':
        // Remove the invoice item
        await this.prisma.invoiceItems.delete({
          where: {
            id:invoiceItemId,
            invoiceId: invoiceId,
          },
        });
        break;
  
      case 'update':
        // Update the invoice item
        const updateData = {}

        if(quantity !== null) updateData['quantity'] = quantity;
        if(itemDiscount !== null) updateData['itemDiscount'] = itemDiscount;

        await this.prisma.invoiceItems.update({
          where: {
            invoiceId: invoiceId,
            id:invoiceItemId
          },
          data:updateData,
        });
        break;
  
      default:
        throw new Error('Invalid action');
    }
  
    // Recalculate the new total amount using a raw SQL query -- Aggregation functions can't handle it now :-<
    const result = await this.prisma.$queryRawTyped(getInoviceTotalAmount(invoiceId));
  
    const totalAmount = result[0]?.totalamount ?? 0;
  
    // Update the invoice with the new total amount
    const invoice = await this.prisma.invoice.update({
      where: { id: invoiceId },
      data: { totalAmount: totalAmount },
      include:{invoiceItems:true, user:false}
    });

    return invoice;


  }

}


 