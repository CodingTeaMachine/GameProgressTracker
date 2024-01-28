/*
  Warnings:

  - A unique constraint covering the columns `[title,game_id]` on the table `Area` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Area_title_game_id_key" ON "Area"("title", "game_id");
