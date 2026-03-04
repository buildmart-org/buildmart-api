/*
  Warnings:

  - You are about to drop the `products-categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products-categories" DROP CONSTRAINT "products-categories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "products-categories" DROP CONSTRAINT "products-categories_productId_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "categoryId" UUID NOT NULL;

-- DropTable
DROP TABLE "products-categories";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
