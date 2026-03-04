import { Prisma } from '@prisma/client';

export const PRODUCT_LIST_CATEGORY_DETAILS_SELECT = Prisma.validator<Prisma.CategorySelect>()({
    id: true,
    title: true,
    slug: true,
});

export type ProductListCategorySelectType = Prisma.CategoryGetPayload<{
    select: typeof PRODUCT_LIST_CATEGORY_DETAILS_SELECT;
}>;

export const PRODUCT_SPECS_SELECT = Prisma.validator<Prisma.ProductSpecSelect>()({
    id: true,
    key: true,
    value: true,
});

export type ProductSpecSelectType = Prisma.ProductSpecGetPayload<{
    select: typeof PRODUCT_SPECS_SELECT;
}>;

export const PRODUCT_ATTRIBUTES_SELECT = Prisma.validator<Prisma.ProductAttributeSelect>()({
    id: true,
    key: true,
    value: true,
});

export type ProductAttributeSelectType = Prisma.ProductAttributeGetPayload<{
    select: typeof PRODUCT_ATTRIBUTES_SELECT;
}>;

export const PRODUCT_LIST_SELECT = Prisma.validator<Prisma.ProductSelect>()({
    id: true,
    title: true,
    description: true,
    price: true,
    priceOld: true,
    rating: true,
    category: { select: PRODUCT_LIST_CATEGORY_DETAILS_SELECT },
    createdAt: true,
    updatedAt: true,
});

export const PRODUCT_DETAILS_SELECT = Prisma.validator<Prisma.ProductSelect>()({
    id: true,
    title: true,
    description: true,
    price: true,
    priceOld: true,
    rating: true,
    category: { select: PRODUCT_LIST_CATEGORY_DETAILS_SELECT },
    attributes: { select: PRODUCT_ATTRIBUTES_SELECT },
    specs: { select: PRODUCT_SPECS_SELECT },
    createdAt: true,
    updatedAt: true,
});

export type ProductListSelectType = Prisma.ProductGetPayload<{
    select: typeof PRODUCT_LIST_SELECT;
}>;

export type ProductDetailsSelectType = Prisma.ProductGetPayload<{
    select: typeof PRODUCT_DETAILS_SELECT;
}>;
