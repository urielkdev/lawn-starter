-- CreateTable
CREATE TABLE "people" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth_year" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "eye_color" TEXT NOT NULL,
    "hair_color" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "mass" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "people_uid_key" ON "people"("uid");
