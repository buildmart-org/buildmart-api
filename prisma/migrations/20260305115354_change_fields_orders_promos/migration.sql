/*
  Warnings:

  - You are about to drop the column `active` on the `orders-promos` table. All the data in the column will be lost.
  - You are about to drop the column `discountValue` on the `orders-promos` table. All the data in the column will be lost.
  - Added the required column `discount` to the `orders-promos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders-promos" DROP COLUMN "active",
DROP COLUMN "discountValue",
ADD COLUMN     "discount" DECIMAL(5,2) NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
