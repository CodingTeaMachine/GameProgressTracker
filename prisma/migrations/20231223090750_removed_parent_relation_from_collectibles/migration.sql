/*
  Warnings:

  - You are about to drop the column `parent_id` on the `Collectible` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collectible" DROP CONSTRAINT "Collectible_parent_id_fkey";

-- AlterTable
ALTER TABLE "Collectible" DROP COLUMN "parent_id";
