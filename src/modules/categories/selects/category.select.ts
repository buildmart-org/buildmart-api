import { Prisma } from '@prisma/client';

export const CATEGORY_LIST_SELECT = Prisma.validator<Prisma.CategorySelect>()({
    id: true,
    title: true,
    slug: true,
    _count: { select: { products: true } },
});

export type CategoriesSelectType = Prisma.CategoryGetPayload<{
    select: typeof CATEGORY_LIST_SELECT;
}>;
