// buildmart-api/src/modules/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { ProductListQueryDto } from './dto/requests/product-list-query.dto';
import { PrismaService } from '@core/prisma/prisma.service';
import { LoggerService } from '@core/logger/logger.service';
import { PRODUCT_DETAILS_SELECT, PRODUCT_LIST_SELECT } from './selects';
import { FileTargetType, Prisma } from '@prisma/client';
import { FilesService } from '@modules/files/files.service';
import { ProductDetailsDto, ProductListDto } from './dto';
import { NotFoundException } from '@common/filters';
import { PaginationMetaDto } from '@common/dto';

@Injectable()
export class ProductsService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly loggerService: LoggerService,
        private readonly filesService: FilesService,
    ) {}

    async findAll(
        query?: ProductListQueryDto,
    ): Promise<{ data: ProductListDto[]; meta: PaginationMetaDto }> {
        this.loggerService.log(`Find all products`);

        const { skip, take, page, limit } = this.resolvePagination(query);
        const orderBy = this.resolveSorting(query?.sort);
        const where = this.resolveFilters(query);

        const [products, total] = await this.prismaService.$transaction([
            this.prismaService.product.findMany({
                select: PRODUCT_LIST_SELECT,
                where,
                skip,
                take,
                orderBy,
            }),
            this.prismaService.product.count({ where }),
        ]);

        const files = await this.filesService.getEntitiesFiles(
            products.map((item) => item.id),
            FileTargetType.PRODUCT,
        );

        const data = ProductListDto.fromEntity(products, files);

        const meta = PaginationMetaDto.from({
            limit,
            currentPage: page,
            lastPage: Math.ceil(total / limit),
            total,
        });

        return { data, meta };
    }

    private resolvePagination(query?: ProductListQueryDto) {
        const page = query?.page ?? 1;
        const limit = query?.limit ?? 20;
        const skip = (page - 1) * limit;

        return { skip, take: limit, page, limit };
    }
    private resolveSorting(sort?: string): Prisma.ProductOrderByWithRelationInput {
        if (!sort) return { createdAt: 'desc' };

        const [field, direction] = sort.split(':') as [
            keyof Prisma.ProductOrderByWithRelationInput,
            'asc' | 'desc',
        ];

        return { [field]: direction };
    }

    private resolveFilters(query?: ProductListQueryDto): Prisma.ProductWhereInput {
        const where: Prisma.ProductWhereInput = {};

        if (!query) return where;

        if (query.category) {
            where.categoryId = query.category;
        }

        if (query.priceFrom !== undefined || query.priceTo !== undefined) {
            where.price = {};
            if (query.priceFrom !== undefined) where.price.gte = query.priceFrom;
            if (query.priceTo !== undefined) where.price.lte = query.priceTo;
        }

        if (query.search) {
            where.title = { contains: query.search, mode: 'insensitive' };
        }

        if (query.rating) {
            if (!isNaN(query.rating)) where.rating = query.rating;
        }

        return where;
    }

    async findById(id: string): Promise<ProductDetailsDto> {
        this.loggerService.log(`Find product by id: ${id}`);

        const product = await this.prismaService.product.findUnique({
            select: PRODUCT_DETAILS_SELECT,
            where: { id },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const files = await this.filesService.getEntityFile(product.id, FileTargetType.PRODUCT);

        return ProductDetailsDto.fromEntity(product, files);
    }
}
