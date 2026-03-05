import { Prisma } from '@prisma/client';

export const ORDER_ITEMS_LIST_SELECT = Prisma.validator<Prisma.OrderItemSelect>()({
    productId: true,
    quantity: true,
    price: true,
});

export type OrderItemsListSelectType = Prisma.OrderItemGetPayload<{
    select: typeof ORDER_ITEMS_LIST_SELECT;
}>;

export const ORDER_DETAILS_SELECT = Prisma.validator<Prisma.OrderSelect>()({
    id: true,
    email: true,
    subtotal: true,
    tax: true,
    discount: true,
    total: true,
    status: true,
    items: { select: ORDER_ITEMS_LIST_SELECT },
});

export type OrderDetailsSelectType = Prisma.OrderGetPayload<{
    select: typeof ORDER_DETAILS_SELECT;
}>;

export const ORDER_PROMO_SELECT = Prisma.validator<Prisma.OrderPromoSelect>()({
    id: true,
    code: true,
    discountValue: true,
    active: true,
    createdAt: true,
});

export type OrderPromoSelectType = Prisma.OrderPromoGetPayload<{
    select: typeof ORDER_PROMO_SELECT;
}>;
