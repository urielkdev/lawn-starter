-- CreateTable
CREATE TABLE "_people_movies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_people_movies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_people_movies_B_index" ON "_people_movies"("B");

-- AddForeignKey
ALTER TABLE "_people_movies" ADD CONSTRAINT "_people_movies_A_fkey" FOREIGN KEY ("A") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_people_movies" ADD CONSTRAINT "_people_movies_B_fkey" FOREIGN KEY ("B") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;
