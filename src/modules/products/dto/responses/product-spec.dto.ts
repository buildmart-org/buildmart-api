import { ProductSpecSelectType } from '@modules/products/selects';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductSpecDto {
    @ApiProperty()
    @Expose()
    id!: string;

    @ApiProperty()
    @Expose()
    key!: string;

    @ApiProperty()
    @Expose()
    value!: string;

    constructor(partial: Partial<ProductSpecDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(entity: ProductSpecSelectType): ProductSpecDto {
        return new ProductSpecDto({
            id: entity.id,
            key: entity.key,
            value: entity.value,
        });
    }
}
