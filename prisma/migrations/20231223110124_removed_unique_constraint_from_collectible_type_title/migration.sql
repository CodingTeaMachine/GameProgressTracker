/*
  Warnings:

  - A unique constraint covering the columns `[title,game_id]` on the table `CollectibleType` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CollectibleType_game_id_title_key";

-- DropIndex
DROP INDEX "CollectibleType_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "CollectibleType_title_game_id_key" ON "CollectibleType"("title", "game_id");
