/*
  Warnings:

  - A unique constraint covering the columns `[game_id,title]` on the table `CollectibleType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CollectibleType_game_id_title_key" ON "CollectibleType"("game_id", "title");
