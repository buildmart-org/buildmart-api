import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProductListSelectType } from '@modules/products/selects';
import { toNullable } from '@common/utlities/to-nullable.util';
import { ProductListCategoryDto } from './product-list-category.dto';
import { FileListDto } from '@modules/files/dto';
import { decimalToNumber } from '@common/utlities';

export class ProductListDto {
    @ApiProperty()
    @Expose()
    id!: string;

    @ApiProperty()
    @Expose()
    title!: string;

    @ApiPropertyOptional()
    @Expose()
    description!: string | null;

    @ApiProperty()
    @Expose()
    price!: number;

    @ApiProperty()
    @Expose()
    priceOld!: number | null;

    @ApiPropertyOptional()
    @Expose()
    rating!: number | null;

    @ApiProperty()
    @Expose()
    @Type(() => ProductListCategoryDto)
    category!: ProductListCategoryDto;

    @ApiPropertyOptional()
    @Expose()
    files!: FileListDto[];

    constructor(partial: Partial<ProductListDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(
        entities: ProductListSelectType[],
        filesMap: Map<string, FileListDto[]>,
    ): ProductListDto[] {
        return entities.map((item) => {
            const files = filesMap.get(item.id) ?? [];

            return new ProductListDto({
                id: item.id,
                title: item.title,
                description: toNullable(item.description),
                price: decimalToNumber(item.price),
                priceOld: item.priceOld && decimalToNumber(item.priceOld),
                rating: item.rating,
                category: ProductListCategoryDto.fromEntity({
                    id: item.category.id,
                    title: item.category.title,
                    slug: item.category.slug,
                }),
                files: files,
            });
        });
    }
}
