/*
  Warnings:

  - You are about to drop the `products-deals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products-deals" DROP CONSTRAINT "products-deals_dealId_fkey";

-- DropForeignKey
ALTER TABLE "products-deals" DROP CONSTRAINT "products-deals_productId_fkey";

-- DropTable
DROP TABLE "products-deals";

-- CreateTable
CREATE TABLE "_DealToProduct" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_DealToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DealToProduct_B_index" ON "_DealToProduct"("B");

-- AddForeignKey
ALTER TABLE "_DealToProduct" ADD CONSTRAINT "_DealToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "deals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DealToProduct" ADD CONSTRAINT "_DealToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
