/*
  Warnings:

  - You are about to drop the `AchievementGradeStorefront` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AchievementStorefront` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameDevelopers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameGenres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GamePlatforms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GamePublishers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AchievementGradeStorefront" DROP CONSTRAINT "AchievementGradeStorefront_achievement_grade_id_fkey";

-- DropForeignKey
ALTER TABLE "AchievementGradeStorefront" DROP CONSTRAINT "AchievementGradeStorefront_storefront_id_fkey";

-- DropForeignKey
ALTER TABLE "AchievementStorefront" DROP CONSTRAINT "AchievementStorefront_achievement_grade_storefront_id_fkey";

-- DropForeignKey
ALTER TABLE "AchievementStorefront" DROP CONSTRAINT "AchievementStorefront_achievement_id_fkey";

-- DropForeignKey
ALTER TABLE "GameDevelopers" DROP CONSTRAINT "GameDevelopers_developer_id_fkey";

-- DropForeignKey
ALTER TABLE "GameDevelopers" DROP CONSTRAINT "GameDevelopers_game_id_fkey";

-- DropForeignKey
ALTER TABLE "GameGenres" DROP CONSTRAINT "GameGenres_game_id_fkey";

-- DropForeignKey
ALTER TABLE "GameGenres" DROP CONSTRAINT "GameGenres_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "GamePlatforms" DROP CONSTRAINT "GamePlatforms_game_id_fkey";

-- DropForeignKey
ALTER TABLE "GamePlatforms" DROP CONSTRAINT "GamePlatforms_platform_id_fkey";

-- DropForeignKey
ALTER TABLE "GamePublishers" DROP CONSTRAINT "GamePublishers_game_id_fkey";

-- DropForeignKey
ALTER TABLE "GamePublishers" DROP CONSTRAINT "GamePublishers_publisher_id_fkey";

-- DropTable
DROP TABLE "AchievementGradeStorefront";

-- DropTable
DROP TABLE "AchievementStorefront";

-- DropTable
DROP TABLE "GameDevelopers";

-- DropTable
DROP TABLE "GameGenres";

-- DropTable
DROP TABLE "GamePlatforms";

-- DropTable
DROP TABLE "GamePublishers";

-- CreateTable
CREATE TABLE "_GameToGenre"
(
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GameToPublisher"
(
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GameToPlatform"
(
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DeveloperToGame"
(
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AchievementGradeToStorefront"
(
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToGenre_AB_unique" ON "_GameToGenre" ("A", "B");

-- CreateIndex
CREATE INDEX "_GameToGenre_B_index" ON "_GameToGenre" ("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToPublisher_AB_unique" ON "_GameToPublisher" ("A", "B");

-- CreateIndex
CREATE INDEX "_GameToPublisher_B_index" ON "_GameToPublisher" ("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToPlatform_AB_unique" ON "_GameToPlatform" ("A", "B");

-- CreateIndex
CREATE INDEX "_GameToPlatform_B_index" ON "_GameToPlatform" ("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DeveloperToGame_AB_unique" ON "_DeveloperToGame" ("A", "B");

-- CreateIndex
CREATE INDEX "_DeveloperToGame_B_index" ON "_DeveloperToGame" ("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AchievementGradeToStorefront_AB_unique" ON "_AchievementGradeToStorefront" ("A", "B");

-- CreateIndex
CREATE INDEX "_AchievementGradeToStorefront_B_index" ON "_AchievementGradeToStorefront" ("B");

-- AddForeignKey
ALTER TABLE "_GameToGenre"
    ADD CONSTRAINT "_GameToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToGenre"
    ADD CONSTRAINT "_GameToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToPublisher"
    ADD CONSTRAINT "_GameToPublisher_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToPublisher"
    ADD CONSTRAINT "_GameToPublisher_B_fkey" FOREIGN KEY ("B") REFERENCES "Publisher" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToPlatform"
    ADD CONSTRAINT "_GameToPlatform_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToPlatform"
    ADD CONSTRAINT "_GameToPlatform_B_fkey" FOREIGN KEY ("B") REFERENCES "Platform" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeveloperToGame"
    ADD CONSTRAINT "_DeveloperToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "Developer" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeveloperToGame"
    ADD CONSTRAINT "_DeveloperToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementGradeToStorefront"
    ADD CONSTRAINT "_AchievementGradeToStorefront_A_fkey" FOREIGN KEY ("A") REFERENCES "AchievementGrade" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementGradeToStorefront"
    ADD CONSTRAINT "_AchievementGradeToStorefront_B_fkey" FOREIGN KEY ("B") REFERENCES "Storefront" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
