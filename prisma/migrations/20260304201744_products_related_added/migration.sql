-- CreateTable
CREATE TABLE "_RelatedProducts" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_RelatedProducts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_RelatedProducts_B_index" ON "_RelatedProducts"("B");

-- AddForeignKey
ALTER TABLE "_RelatedProducts" ADD CONSTRAINT "_RelatedProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedProducts" ADD CONSTRAINT "_RelatedProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
