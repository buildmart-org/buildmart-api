// buildmart-api/src/modules/products/dto/responses/product-details.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProductDetailsSelectType } from '@modules/products/selects';
import { toNullable } from '@common/utlities/to-nullable.util';
import { ProductListCategoryDto } from './product-list-category.dto';
import { decimalToNumber } from '@common/utlities';
import { FileDetailsDto } from '@modules/files/dto';

export class ProductDetailsDto {
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
    attributes!: Record<string, any> | null;

    @ApiPropertyOptional()
    @Expose()
    specs!: Record<string, any> | null;

    @ApiPropertyOptional()
    @Expose()
    file!: string | null;

    constructor(partial: Partial<ProductDetailsDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(entity: ProductDetailsSelectType, file: FileDetailsDto): ProductDetailsDto {
        return new ProductDetailsDto({
            id: entity.id,
            title: entity.title,
            description: toNullable(entity.description),
            price: decimalToNumber(entity.price),
            priceOld: entity.priceOld && decimalToNumber(entity.priceOld),
            rating: toNullable(entity.rating),
            category: new ProductListCategoryDto({
                id: entity.category.id,
                title: entity.category.title,
                slug: entity.category.slug,
            }),
            attributes: toNullable(entity.attributes),
            specs: toNullable(entity.specs),
            file: toNullable(file.url),
        });
    }
}
