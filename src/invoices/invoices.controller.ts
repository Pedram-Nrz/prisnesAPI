import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { TokenAuthGuard } from 'src/auth/TokenAuth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateInvoiceItemDto } from './dto/create-invoiceitem.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoiceitem.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { AuthenticatedUser, IAuthenticatedUser } from 'src/auth/decorators/authenticatedUser.decorator';
 
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth()
  async create(@AuthenticatedUser() user: IAuthenticatedUser, @Body() createInvoiceDto: CreateInvoiceDto) {
    createInvoiceDto.userId = user?.userid;
    return await this.invoicesService.create(createInvoiceDto);
  }

  @Post("add/:id")
  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth()
  async addItem(@Param('id', ParseIntPipe) id: number, @Body() createInvoiceItemDto: CreateInvoiceItemDto) {
    return await this.invoicesService.addItem(id,createInvoiceItemDto);
  }

  @Get()
  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth()
  async findAll() {
    return await this.invoicesService.findAll();
  }

  @Get(':id')
  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.invoicesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth()
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return await this.invoicesService.update(id, updateInvoiceDto);
  }

  @Patch(':id/item/:itemid')
  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth()
  async updateInvoiceItem(@Param('id',ParseIntPipe) id: number, @Param('itemid',ParseIntPipe) itemid: number, @Body() updateInvoiceItemDto: UpdateInvoiceItemDto) {
    return await this.invoicesService.updateItem(id,itemid, updateInvoiceItemDto);
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id',ParseIntPipe) id: number) {
    return await this.invoicesService.remove(id);
  }

  @Delete(':id/item/:itemid')
  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth()
  async removeItem(@Param('id',ParseIntPipe) id: number, @Param('itemid',ParseIntPipe) itemid: number) {
    return await this.invoicesService.removeItem(id,itemid);
  }


}
