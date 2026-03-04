import { Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductListQueryDto } from './dto/requests/product-list-query.dto';
import { ProductDetailsDto, ProductListDto } from './dto';
import { PaginationMetaDto } from '@common/dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Categories' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Found categories',
        type: [ProductListDto],
    })
    async findAll(
        @Query() query: ProductListQueryDto,
    ): Promise<{ data: ProductListDto[]; meta: PaginationMetaDto }> {
        return await this.productsService.findAll(query);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Categories' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Found category by id',
        type: ProductDetailsDto,
    })
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<ProductDetailsDto> {
        return await this.productsService.findById(id);
    }
}
