/*
  Warnings:

  - Added the required column `game_id` to the `Collectible` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collectible"
    ADD COLUMN "game_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Collectible"
    ADD CONSTRAINT "Collectible_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
