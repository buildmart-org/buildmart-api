import { Controller, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/requests/create-order.dto';
import { OrderDto, OrderPromoDto } from './dto/responses/order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post('guest')
    async guestCreateOrder(@Body() dto: CreateOrderDto): Promise<OrderDto> {
        return await this.ordersService.guestCreateOrder(dto);
    }

    @Post('apply-promo/:code')
    async applyPromo(@Param('code') code: string): Promise<OrderPromoDto> {
        return await this.ordersService.applyPromo(code);
    }
}
