-- CreateTable
CREATE TABLE "Game"
(
    "id"           SERIAL  NOT NULL,
    "title"        TEXT    NOT NULL,
    "cover"        TEXT,
    "description"  TEXT    NOT NULL,
    "is_dlc"       BOOLEAN NOT NULL DEFAULT false,
    "release_date" DATE    NOT NULL,
    "deleted"      BOOLEAN NOT NULL DEFAULT false,
    "deleted_at"   TIMESTAMP(3),
    "parent_id"    INTEGER,
    "franchise_id" INTEGER,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Franchise"
(
    "id"         SERIAL  NOT NULL,
    "title"      TEXT    NOT NULL,
    "deleted"    BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Franchise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre"
(
    "id"         SERIAL  NOT NULL,
    "label"      TEXT    NOT NULL,
    "deleted"    BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publisher"
(
    "id"         SERIAL  NOT NULL,
    "label"      TEXT    NOT NULL,
    "deleted"    BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Developer"
(
    "id"         SERIAL  NOT NULL,
    "label"      TEXT    NOT NULL,
    "deleted"    BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Platform"
(
    "id"         SERIAL  NOT NULL,
    "name"       TEXT    NOT NULL,
    "deleted"    BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collectible"
(
    "id"            SERIAL  NOT NULL,
    "title"         TEXT    NOT NULL,
    "icon"          TEXT,
    "description"   TEXT,
    "amount"        INTEGER NOT NULL DEFAULT 1,
    "is_standalone" BOOLEAN NOT NULL DEFAULT true,
    "deleted"       BOOLEAN NOT NULL DEFAULT false,
    "deleted_at"    TIMESTAMP(3),
    "parent_id"     INTEGER,

    CONSTRAINT "Collectible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement"
(
    "id"          SERIAL  NOT NULL,
    "title"       TEXT    NOT NULL,
    "icon"        TEXT,
    "description" TEXT,
    "deleted"     BOOLEAN NOT NULL DEFAULT false,
    "deleted_at"  TIMESTAMP(3),
    "game_id"     INTEGER NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementGrade"
(
    "id"         SERIAL  NOT NULL,
    "label"      TEXT    NOT NULL,
    "icon"       TEXT,
    "deleted"    BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "AchievementGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamePublishers"
(
    "game_id"      INTEGER NOT NULL,
    "publisher_id" INTEGER NOT NULL,

    CONSTRAINT "GamePublishers_pkey" PRIMARY KEY ("game_id", "publisher_id")
);

-- CreateTable
CREATE TABLE "GameDevelopers"
(
    "game_id"      INTEGER NOT NULL,
    "developer_id" INTEGER NOT NULL,

    CONSTRAINT "GameDevelopers_pkey" PRIMARY KEY ("game_id", "developer_id")
);

-- CreateTable
CREATE TABLE "GameGenres"
(
    "game_id"  INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "GameGenres_pkey" PRIMARY KEY ("game_id", "genre_id")
);

-- CreateTable
CREATE TABLE "GamePlatforms"
(
    "game_id"     INTEGER NOT NULL,
    "platform_id" INTEGER NOT NULL,

    CONSTRAINT "GamePlatforms_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "AchievementPlatform"
(
    "achievement_id"       INTEGER NOT NULL,
    "platform_id"          INTEGER NOT NULL,
    "achievement_grade_id" INTEGER NOT NULL,

    CONSTRAINT "AchievementPlatform_pkey" PRIMARY KEY ("achievement_id", "platform_id", "achievement_grade_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_id_key" ON "Game" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_id_key" ON "Franchise" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_title_key" ON "Franchise" ("title");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_id_key" ON "Genre" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_label_key" ON "Genre" ("label");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_id_key" ON "Publisher" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_label_key" ON "Publisher" ("label");

-- CreateIndex
CREATE UNIQUE INDEX "Developer_id_key" ON "Developer" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Developer_label_key" ON "Developer" ("label");

-- CreateIndex
CREATE UNIQUE INDEX "Platform_id_key" ON "Platform" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Platform_name_key" ON "Platform" ("name");

-- CreateIndex
CREATE UNIQUE INDEX "Collectible_id_key" ON "Collectible" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Collectible_title_key" ON "Collectible" ("title");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_id_key" ON "Achievement" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_title_key" ON "Achievement" ("title");

-- CreateIndex
CREATE UNIQUE INDEX "AchievementGrade_id_key" ON "AchievementGrade" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "AchievementGrade_label_key" ON "AchievementGrade" ("label");

-- AddForeignKey
ALTER TABLE "Game"
    ADD CONSTRAINT "Game_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Game" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game"
    ADD CONSTRAINT "Game_franchise_id_fkey" FOREIGN KEY ("franchise_id") REFERENCES "Franchise" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collectible"
    ADD CONSTRAINT "Collectible_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Collectible" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement"
    ADD CONSTRAINT "Achievement_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePublishers"
    ADD CONSTRAINT "GamePublishers_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePublishers"
    ADD CONSTRAINT "GamePublishers_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "Publisher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameDevelopers"
    ADD CONSTRAINT "GameDevelopers_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameDevelopers"
    ADD CONSTRAINT "GameDevelopers_developer_id_fkey" FOREIGN KEY ("developer_id") REFERENCES "Developer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameGenres"
    ADD CONSTRAINT "GameGenres_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameGenres"
    ADD CONSTRAINT "GameGenres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlatforms"
    ADD CONSTRAINT "GamePlatforms_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlatforms"
    ADD CONSTRAINT "GamePlatforms_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "Platform" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementPlatform"
    ADD CONSTRAINT "AchievementPlatform_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "Achievement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementPlatform"
    ADD CONSTRAINT "AchievementPlatform_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "Platform" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementPlatform"
    ADD CONSTRAINT "AchievementPlatform_achievement_grade_id_fkey" FOREIGN KEY ("achievement_grade_id") REFERENCES "AchievementGrade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
