/*
  Warnings:

  - You are about to drop the column `platform_id` on the `Storefront` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Storefront" DROP CONSTRAINT "Storefront_platform_id_fkey";

-- AlterTable
ALTER TABLE "Storefront" DROP COLUMN "platform_id",
ADD COLUMN     "hasAchievement" BOOLEAN NOT NULL DEFAULT false;
