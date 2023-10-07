/*
  Warnings:

  - The primary key for the `AchievementStorefront` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `achievement_grade_id` on the `AchievementStorefront` table. All the data in the column will be lost.
  - You are about to drop the column `storefront_id` on the `AchievementStorefront` table. All the data in the column will be lost.
  - Added the required column `achievement_grade_storefront_id` to the `AchievementStorefront` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AchievementStorefront" DROP CONSTRAINT "AchievementStorefront_achievement_grade_id_fkey";

-- DropForeignKey
ALTER TABLE "AchievementStorefront" DROP CONSTRAINT "AchievementStorefront_storefront_id_fkey";

-- AlterTable
ALTER TABLE "AchievementStorefront" DROP CONSTRAINT "AchievementStorefront_pkey",
DROP
COLUMN "achievement_grade_id",
DROP
COLUMN "storefront_id",
ADD COLUMN     "achievement_grade_storefront_id" INTEGER NOT NULL,
ADD CONSTRAINT "AchievementStorefront_pkey" PRIMARY KEY ("achievement_id", "achievement_grade_storefront_id");

-- CreateTable
CREATE TABLE "AchievementGradeStorefront"
(
    "id"                   SERIAL  NOT NULL,
    "storefront_id"        INTEGER NOT NULL,
    "achievement_grade_id" INTEGER NOT NULL,

    CONSTRAINT "AchievementGradeStorefront_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AchievementGradeStorefront_id_key" ON "AchievementGradeStorefront" ("id");

-- AddForeignKey
ALTER TABLE "AchievementStorefront"
    ADD CONSTRAINT "AchievementStorefront_achievement_grade_storefront_id_fkey" FOREIGN KEY ("achievement_grade_storefront_id") REFERENCES "AchievementGradeStorefront" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementGradeStorefront"
    ADD CONSTRAINT "AchievementGradeStorefront_storefront_id_fkey" FOREIGN KEY ("storefront_id") REFERENCES "Storefront" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementGradeStorefront"
    ADD CONSTRAINT "AchievementGradeStorefront_achievement_grade_id_fkey" FOREIGN KEY ("achievement_grade_id") REFERENCES "AchievementGrade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
