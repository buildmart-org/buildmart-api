import { Expose } from 'class-transformer';
import { ProductListDto } from '@modules/products/dto';
import { FileListDto } from '@modules/files/dto';
import { DealListSelect } from '@modules/deals/selects';

export class DealListDto {
    @Expose()
    id!: string;

    @Expose()
    title!: string;

    @Expose()
    description!: string;

    @Expose()
    bannerTitle!: string;

    @Expose()
    bannerText!: string;

    @Expose()
    endsAt!: Date;

    @Expose()
    isActive!: boolean;

    @Expose()
    products!: ProductListDto[];

    constructor(partial: Partial<DealListDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(entities: DealListSelect[], files: Map<string, FileListDto>): DealListDto[] {
        return entities.map((item) => {
            return new DealListDto({
                id: item.id,
                title: item.title,
                description: item.description,
                bannerTitle: item.bannerTitle,
                bannerText: item.bannerText,
                endsAt: item.endsAt,
                isActive: item.isActive,
                products: ProductListDto.fromEntity(item.products, files),
            });
        });
    }
}
