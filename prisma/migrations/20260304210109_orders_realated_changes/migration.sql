-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "promoId" UUID;

-- CreateTable
CREATE TABLE "orders-promos" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "discountValue" DECIMAL(5,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders-promos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders-promos_code_key" ON "orders-promos"("code");

-- CreateIndex
CREATE INDEX "orders-promos_code_idx" ON "orders-promos"("code");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_promoId_fkey" FOREIGN KEY ("promoId") REFERENCES "orders-promos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
