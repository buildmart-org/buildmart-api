import { decimalToNumber } from '@common/utlities';
import { OrderDetailsSelectType, OrderItemsListSelectType } from '@modules/orders/selects';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class OrderItemListDto {
    @ApiProperty()
    @Expose()
    productId!: string;

    @ApiProperty()
    @Expose()
    quantity!: number;

    @ApiProperty()
    @Expose()
    price!: number;

    constructor(partial: Partial<OrderItemListDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(entity: OrderItemsListSelectType[]): OrderItemListDto[] {
        return entity.map(
            (item) =>
                new OrderItemListDto({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: decimalToNumber(item.price),
                }),
        );
    }
}

export class OrderDto {
    @ApiProperty()
    @Expose()
    id!: string;

    @ApiProperty()
    @Expose()
    email!: string | null;

    @ApiProperty()
    @Expose()
    subtotal!: number;

    @ApiProperty()
    @Expose()
    tax!: number;

    @ApiProperty()
    @Expose()
    discount!: number;

    @ApiProperty()
    @Expose()
    total!: number;

    @ApiProperty()
    @Expose()
    status!: string;

    @ApiProperty({ type: [OrderItemListDto] })
    @Expose()
    @Type(() => OrderItemListDto)
    items!: OrderItemListDto[];

    constructor(partial: Partial<OrderDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(entity: OrderDetailsSelectType): OrderDto {
        return new OrderDto({
            id: entity.id,
            email: entity.email,
            subtotal: decimalToNumber(entity.subtotal),
            tax: decimalToNumber(entity.tax),
            discount: decimalToNumber(entity.discount),
            total: decimalToNumber(entity.total),
            status: entity.status,
            items: OrderItemListDto.fromEntity(entity.items),
        });
    }
}
