import { LoggerService } from '@core/logger/logger.service';
import { PrismaService } from '@core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FileTargetType } from '@prisma/client';
import { CATEGORY_LIST_SELECT } from './selects';
import { CategoryListDto } from './dto/responses/category-list.dto';
import { FilesService } from '@modules/files/files.service';

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
}
