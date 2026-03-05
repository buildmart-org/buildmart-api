import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma/prisma.service';
import { LoggerService } from '@core/logger/logger.service';
import { CreateOrderDto } from './dto/requests/create-order.dto';
import { OrderDto, OrderPromoDto } from './dto/responses/order.dto';
import { ORDER_DETAILS_SELECT, ORDER_PROMO_SELECT } from './selects';
import { BadRequestException } from '@common/filters/exceptions/bad-request.exception';

@Injectable()
export class OrdersService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly loggerService: LoggerService,
    ) {}

    async guestCreateOrder(dto: CreateOrderDto): Promise<OrderDto> {
        this.loggerService.log(`Creating order for ${dto.email}`);

        const { subtotal, preparedItems } = await this.calculateOrderItems(dto);

        const systemTax = await this.prismaService.systemSettings.findUnique({
            where: { key: 'tax' },
        });

        console.log(systemTax);
        if (!systemTax) throw new BadRequestException('Tax not set. Contact admin.');

        const tax = subtotal * Number(systemTax.value);

        let discount = 0;
        let promoId: string | undefined;

        if (dto.code) {
            const promo = await this.applyPromo(dto.code);
            discount = subtotal * (Number(promo.discount) / 100);
            promoId = promo.id;
        }

        const total = subtotal + tax - discount;

        const order = await this.prismaService.order.create({
            select: ORDER_DETAILS_SELECT,
            data: {
                email: dto.email,
                userId: dto.userId ?? null,
                subtotal,
                tax,
                discount,
                total,
                promoId,
                items: {
                    create: preparedItems,
                },
            },
        });

        return OrderDto.fromEntity(order);
    }

    async applyPromo(code: string): Promise<OrderPromoDto> {
        this.loggerService.log(`Applying promo code ${code}`);

        const promo = await this.prismaService.orderPromo.findFirst({
            where: { code, isActive: true },
            select: ORDER_PROMO_SELECT,
        });

        if (!promo) throw new BadRequestException('Invalid promo code. Contact admin');

        return OrderPromoDto.fromEntity(promo);
    }

    private async calculateOrderItems(dto: CreateOrderDto): Promise<{
        subtotal: number;
        preparedItems: {
            productId: string;
            quantity: number;
            price: number;
        }[];
    }> {
        const productIds = dto.items.map((item) => item.productId);

        const products = await this.prismaService.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, price: true },
        });

        if (products.length !== productIds.length)
            throw new BadRequestException('One or more products not exists');

        const productMap = new Map(products.map((product) => [product.id, product]));

        let subtotal = 0;

        const preparedItems = dto.items.map((item) => {
            const product = productMap.get(item.productId);

            if (!product) throw new BadRequestException(`Product ${item.productId} not exists`);

            const price = Number(product.price);
            const itemTotal = price * item.quantity;

            subtotal += itemTotal;

            return {
                productId: item.productId,
                quantity: item.quantity,
                price,
            };
        });

        return { subtotal, preparedItems };
    }
}
