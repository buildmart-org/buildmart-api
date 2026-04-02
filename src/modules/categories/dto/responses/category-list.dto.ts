import { CategoriesSelectType } from '@modules/categories/selects';
import { FileListDto } from '@modules/files/dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoryListDto {
    @ApiProperty()
    @Expose()
    id!: string;

    @ApiProperty()
    @Expose()
    title!: string;

    @ApiProperty()
    @Expose()
    slug!: string;

    @ApiProperty()
    @Expose()
    productCount!: number;

    @ApiPropertyOptional()
    @Expose()
    files!: FileListDto[];

    constructor(partial: Partial<CategoryListDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(
        entity: CategoriesSelectType[],
        filesMap: Map<string, FileListDto[]>,
    ): CategoryListDto[] {
        return entity.map((item) => {
            const files = filesMap.get(item.id) ?? [];

            return new CategoryListDto({
                id: item.id,
                title: item.title,
                slug: item.slug,
                productCount: item._count.products,
                files: files,
            });
        });
    }
}
