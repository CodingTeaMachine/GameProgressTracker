/*
  Warnings:

  - You are about to drop the `AchievementPlatform` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AchievementPlatform" DROP CONSTRAINT "AchievementPlatform_achievement_grade_id_fkey";

-- DropForeignKey
ALTER TABLE "AchievementPlatform" DROP CONSTRAINT "AchievementPlatform_achievement_id_fkey";

-- DropForeignKey
ALTER TABLE "AchievementPlatform" DROP CONSTRAINT "AchievementPlatform_platform_id_fkey";

-- DropTable
DROP TABLE "AchievementPlatform";

-- CreateTable
CREATE TABLE "Storefront"
(
    "id"          SERIAL  NOT NULL,
    "name"        TEXT    NOT NULL,
    "deleted"     BOOLEAN NOT NULL DEFAULT false,
    "deleted_at"  TIMESTAMP(3),
    "type_id"     INTEGER NOT NULL,
    "platform_id" INTEGER NOT NULL,

    CONSTRAINT "Storefront_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreFrontType"
(
    "id"         SERIAL  NOT NULL,
    "name"       TEXT    NOT NULL,
    "deleted"    BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "StoreFrontType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementStorefront"
(
    "achievement_id"       INTEGER NOT NULL,
    "storefront_id"        INTEGER NOT NULL,
    "achievement_grade_id" INTEGER NOT NULL,

    CONSTRAINT "AchievementStorefront_pkey" PRIMARY KEY ("achievement_id", "storefront_id", "achievement_grade_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Storefront_id_key" ON "Storefront" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Storefront_name_key" ON "Storefront" ("name");

-- CreateIndex
CREATE UNIQUE INDEX "StoreFrontType_id_key" ON "StoreFrontType" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "StoreFrontType_name_key" ON "StoreFrontType" ("name");

-- AddForeignKey
ALTER TABLE "Storefront"
    ADD CONSTRAINT "Storefront_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "StoreFrontType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storefront"
    ADD CONSTRAINT "Storefront_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "Platform" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementStorefront"
    ADD CONSTRAINT "AchievementStorefront_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "Achievement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementStorefront"
    ADD CONSTRAINT "AchievementStorefront_storefront_id_fkey" FOREIGN KEY ("storefront_id") REFERENCES "Storefront" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementStorefront"
    ADD CONSTRAINT "AchievementStorefront_achievement_grade_id_fkey" FOREIGN KEY ("achievement_grade_id") REFERENCES "AchievementGrade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
