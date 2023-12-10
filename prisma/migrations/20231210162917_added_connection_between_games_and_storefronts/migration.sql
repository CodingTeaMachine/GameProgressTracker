-- CreateTable
CREATE TABLE "_GameToStorefront" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToStorefront_AB_unique" ON "_GameToStorefront"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToStorefront_B_index" ON "_GameToStorefront"("B");

-- AddForeignKey
ALTER TABLE "_GameToStorefront" ADD CONSTRAINT "_GameToStorefront_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToStorefront" ADD CONSTRAINT "_GameToStorefront_B_fkey" FOREIGN KEY ("B") REFERENCES "Storefront"("id") ON DELETE CASCADE ON UPDATE CASCADE;
