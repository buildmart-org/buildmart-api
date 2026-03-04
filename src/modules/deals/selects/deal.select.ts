import { PRODUCT_LIST_SELECT } from '@modules/products/selects';
import { Prisma } from '@prisma/client';

export const DEAL_LIST_SELECT = Prisma.validator<Prisma.DealSelect>()({
    id: true,
    title: true,
    description: true,
    bannerTitle: true,
    bannerText: true,
    endsAt: true,
    isActive: true,
    products: { select: PRODUCT_LIST_SELECT },
});

export type DealListSelect = Prisma.DealGetPayload<{
    select: typeof DEAL_LIST_SELECT;
}>;
