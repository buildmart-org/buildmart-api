import { ProductAttributeSelectType } from '@modules/products/selects';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductAttributeDto {
    @ApiProperty()
    @Expose()
    id!: string;

    @ApiProperty()
    @Expose()
    key!: string;

    @ApiProperty()
    @Expose()
    value!: string;

    constructor(partial: Partial<ProductAttributeDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(entity: ProductAttributeSelectType): ProductAttributeDto {
        return new ProductAttributeDto({
            id: entity.id,
            key: entity.key,
            value: entity.value,
        });
    }
}
