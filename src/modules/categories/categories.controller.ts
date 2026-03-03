import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryListDto } from './dto/responses/category-list.dto';

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
}
