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

    @ApiPropertyOptional()
    @Expose()
    rating!: number | null;

    @ApiProperty()
    @Expose()
    @Type(() => ProductListCategoryDto)
    category!: ProductListCategoryDto;

    @ApiPropertyOptional()
    @Expose()
    file!: string | null;

    constructor(partial: Partial<ProductListDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(
        entities: ProductListSelectType[],
        files: Map<string, FileListDto>,
    ): ProductListDto[] {
        return entities.map(
            (item) =>
                new ProductListDto({
                    id: item.id,
                    title: item.title,
                    description: toNullable(item.description),
                    price: decimalToNumber(item.price),
                    rating: item.rating,
                    category: ProductListCategoryDto.fromEntity({
                        id: item.category.id,
                        title: item.category.title,
                        slug: item.category.slug,
                    }),
                    file: toNullable(files.get(item.id)?.url),
                }),
        );
    }
}
