import { Prisma } from '@prisma/client';

export const CATEGORIES_SELECT = Prisma.validator<Prisma.CategorySelect>()({
    id: true,
    title: true,
    slug: true,
    _count: { select: { products: true } },
    // account: { select: ACCOUNT_SECURE_SELECT },
    // category: { select: TRANSACTION_CATEGORY_SELECT },
    // createdAt: true,
    // updatedAt: true,
});

export type CategoriesSelectType = Prisma.CategoryGetPayload<{
    select: typeof CATEGORIES_SELECT;
}>;
