import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CategoriesSelectType } from '@modules/categories/selects';

export class CategoryFlatListDto {
    @ApiProperty()
    @Expose()
    id!: string;

    @ApiProperty()
    @Expose()
    title!: string;

    @ApiProperty()
    @Expose()
    slug!: string;

    constructor(partial: Partial<CategoryFlatListDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(
        entity: CategoriesSelectType[],
    ): CategoryFlatListDto[] {
        return entity.map(
            (item) =>
                new CategoryFlatListDto({
                    id: item.id,
                    title: item.title,
                    slug: item.slug,
                }),
        );
    }
}
