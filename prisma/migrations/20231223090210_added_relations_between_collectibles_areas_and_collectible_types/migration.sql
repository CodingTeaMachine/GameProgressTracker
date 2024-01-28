/*
  Warnings:

  - You are about to drop the column `description` on the `Collectible` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Collectible` table. All the data in the column will be lost.
  - You are about to drop the column `is_standalone` on the `Collectible` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Collectible` table. All the data in the column will be lost.
  - Added the required column `area_id` to the `Collectible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collectible_type_id` to the `Collectible` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Collectible_title_key";

-- AlterTable
ALTER TABLE "Collectible" DROP COLUMN "description",
DROP COLUMN "icon",
DROP COLUMN "is_standalone",
DROP COLUMN "title",
ADD COLUMN     "area_id" INTEGER NOT NULL,
ADD COLUMN     "collectible_type_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Collectible" ADD CONSTRAINT "Collectible_collectible_type_id_fkey" FOREIGN KEY ("collectible_type_id") REFERENCES "CollectibleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collectible" ADD CONSTRAINT "Collectible_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
