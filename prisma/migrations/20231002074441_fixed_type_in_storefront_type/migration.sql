/*
  Warnings:

  - You are about to drop the `StoreFrontType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Storefront" DROP CONSTRAINT "Storefront_type_id_fkey";

-- DropTable
DROP TABLE "StoreFrontType";

-- CreateTable
CREATE TABLE "StorefrontType"
(
    "id"         SERIAL  NOT NULL,
    "name"       TEXT    NOT NULL,
    "deleted"    BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "StorefrontType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StorefrontType_id_key" ON "StorefrontType" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "StorefrontType_name_key" ON "StorefrontType" ("name");

-- AddForeignKey
ALTER TABLE "Storefront"
    ADD CONSTRAINT "Storefront_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "StorefrontType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
