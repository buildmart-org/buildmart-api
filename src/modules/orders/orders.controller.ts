import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

import { ApplyPromocodeDto, CreateOrderDto } from '@modules/orders/dto/requests';
import { OrderDto, PromocodeDto } from '@modules/orders/dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post('guest')
    async guestCreateOrder(@Body() dto: CreateOrderDto): Promise<OrderDto> {
        return await this.ordersService.guestCreateOrder(dto);
    }

    @Post('apply-promocode')
    async applyPromo(@Body() dto: ApplyPromocodeDto): Promise<PromocodeDto> {
        return await this.ordersService.applyPromocode(dto);
    }
}
