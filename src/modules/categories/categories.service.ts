import { LoggerService } from '@core/logger/logger.service';
import { PrismaService } from '@core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FileTargetType } from '@prisma/client';
import { CATEGORY_FLAT_LIST_SELECT, CATEGORY_LIST_SELECT } from './selects';
import { CategoryListDto } from './dto/responses/category-list.dto';
import { FilesService } from '@modules/files/files.service';
import { CategoryFlatListDto } from '@modules/categories/dto';

@Injectable()
export class CategoriesService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly loggerService: LoggerService,
        private readonly filesService: FilesService,
    ) {}

    async findAll(): Promise<CategoryListDto[]> {
        this.loggerService.log(`Find all categories`);

        const categories = await this.prismaService.category.findMany({
            select: CATEGORY_LIST_SELECT,
        });

        const files = await this.filesService.getEntitiesFiles(
            categories.map((category) => category.id),
            FileTargetType.CATEGORY,
        );

        return CategoryListDto.fromEntity(categories, files);
    }

    async findAllFlat(): Promise<CategoryFlatListDto[]> {
        this.loggerService.log(`Find all categories flat`);

        const categories = await this.prismaService.category.findMany({
            select: CATEGORY_FLAT_LIST_SELECT,
        });

        return CategoryFlatListDto.fromEntity(categories);
    }
}
