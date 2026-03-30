import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryFlatListDto, CategoryListDto } from '@modules/categories/dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Categories' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Found categories',
        type: [CategoryListDto],
    })
    async findAll(): Promise<CategoryListDto[]> {
        return await this.categoriesService.findAll();
    }

    @Get('flat')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Flat Categories' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Found flat categories for select  on frontend',
        type: [CategoryFlatListDto],
    })
    async findAllFlat(): Promise<CategoryFlatListDto[]> {
        return await this.categoriesService.findAllFlat();
    }
}
