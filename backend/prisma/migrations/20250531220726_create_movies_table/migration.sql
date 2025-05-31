-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "opening_crawl" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_uid_key" ON "movies"("uid");
