import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Res, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { TokenAuthGuard } from 'src/auth/TokenAuth.guard';
import { Request } from 'express';

 
@Controller('products')
@ApiTags("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  
  @Post()
  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({type:ProductEntity})
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);

  }

  
  @Get()
  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({type:ProductEntity, isArray:true})
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({type:ProductEntity})
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({type:ProductEntity})
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({type:ProductEntity})
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.remove(id);
  }
}
