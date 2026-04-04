import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { OrderPromoSelectType } from '@modules/orders/selects';
import { decimalToNumber } from '@common/utlities';

export class PromocodeDto {
    @ApiProperty()
    @Expose()
    promocode!: string;

    @ApiProperty()
    @Expose()
    discount!: number;

    @ApiProperty()
    @Expose()
    isActive!: boolean;

    constructor(partial: Partial<PromocodeDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(entity: OrderPromoSelectType): PromocodeDto {
        return new PromocodeDto({
            promocode: entity.code,
            discount: decimalToNumber(entity.discount),
            isActive: entity.isActive,
        });
    }
}
