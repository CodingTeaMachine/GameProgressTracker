-- CreateTable
CREATE TABLE "CollectibleType" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "CollectibleType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollectibleType_id_key" ON "CollectibleType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CollectibleType_title_key" ON "CollectibleType"("title");

-- AddForeignKey
ALTER TABLE "CollectibleType" ADD CONSTRAINT "CollectibleType_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
