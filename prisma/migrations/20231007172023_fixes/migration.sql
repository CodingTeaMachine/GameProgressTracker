/*
  Warnings:

  - You are about to drop the column `hasAchievements` on the `Storefront` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Storefront" DROP COLUMN "hasAchievements",
ADD COLUMN     "has_achievements" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "AchievementGradeOnStorefrontOnAchievement"
(
    "id"                   SERIAL  NOT NULL,
    "storefront_id"        INTEGER NOT NULL,
    "achievement_grade_id" INTEGER NOT NULL,
    "achievement_id"       INTEGER,

    CONSTRAINT "AchievementGradeOnStorefrontOnAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AchievementGradeOnStorefrontOnAchievement_id_key" ON "AchievementGradeOnStorefrontOnAchievement" ("id");

-- AddForeignKey
ALTER TABLE "AchievementGradeOnStorefrontOnAchievement"
    ADD CONSTRAINT "AchievementGradeOnStorefrontOnAchievement_storefront_id_fkey" FOREIGN KEY ("storefront_id") REFERENCES "Storefront" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementGradeOnStorefrontOnAchievement"
    ADD CONSTRAINT "AchievementGradeOnStorefrontOnAchievement_achievement_grad_fkey" FOREIGN KEY ("achievement_grade_id") REFERENCES "AchievementGrade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementGradeOnStorefrontOnAchievement"
    ADD CONSTRAINT "AchievementGradeOnStorefrontOnAchievement_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "Achievement" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
