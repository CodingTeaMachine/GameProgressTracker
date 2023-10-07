/*
  Warnings:

  - You are about to drop the column `hasAchievement` on the `Storefront` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Storefront" DROP COLUMN "hasAchievement",
ADD COLUMN     "hasAchievements" BOOLEAN NOT NULL DEFAULT false;
