import { ProductListCategorySelectType } from '@modules/products/selects';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductListCategoryDto {
    @ApiProperty()
    @Expose()
    id!: string;

    @ApiProperty()
    @Expose()
    title!: string;

    @ApiProperty()
    @Expose()
    slug!: string;

    constructor(partial: Partial<ProductListCategoryDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(category: ProductListCategorySelectType): ProductListCategoryDto {
        return new ProductListCategoryDto({
            id: category.id,
            title: category.title,
            slug: category.slug,
        });
    }
}
