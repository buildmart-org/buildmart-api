/*
  Warnings:

  - You are about to drop the column `discount` on the `deals` table. All the data in the column will be lost.
  - You are about to drop the column `startsAt` on the `deals` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "deals_isActive_startsAt_endsAt_idx";

-- AlterTable
ALTER TABLE "deals" DROP COLUMN "discount",
DROP COLUMN "startsAt";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "priceOld" DECIMAL(10,2);

-- CreateIndex
CREATE INDEX "deals_isActive_idx" ON "deals"("isActive");
