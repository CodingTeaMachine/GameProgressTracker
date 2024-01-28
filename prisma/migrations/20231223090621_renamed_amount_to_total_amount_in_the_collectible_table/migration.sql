/*
  Warnings:

  - You are about to drop the column `amount` on the `Collectible` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Collectible" DROP COLUMN "amount",
ADD COLUMN     "totalAmount" INTEGER NOT NULL DEFAULT 1;
