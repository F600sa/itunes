-- CreateTable
CREATE TABLE "Podcast" (
    "id" SERIAL NOT NULL,
    "podcastId" INTEGER NOT NULL,
    "artistId" INTEGER,
    "collectionId" INTEGER NOT NULL,
    "artistName" TEXT,
    "collectionName" TEXT,
    "previewUrl" TEXT,
    "artworkUrl600" TEXT,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "trackName" TEXT,
    "podcastTimeMillis" INTEGER,
    "primaryGenreName" TEXT,
    "isStreamable" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Podcast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "episodeId" BIGINT NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "audioUrl" TEXT,
    "artworkUrl600" TEXT,
    "collectionName" TEXT,
    "trackViewUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Podcast_podcastId_key" ON "Podcast"("podcastId");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_episodeId_key" ON "Episode"("episodeId");
