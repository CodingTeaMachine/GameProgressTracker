-- DropForeignKey
ALTER TABLE "Collectible" DROP CONSTRAINT "Collectible_area_id_fkey";

-- AlterTable
ALTER TABLE "Collectible" ALTER COLUMN "area_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Collectible" ADD CONSTRAINT "Collectible_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;
