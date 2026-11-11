/*
  Warnings:

  - A unique constraint covering the columns `[imageUrl]` on the table `Character` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Character_imageUrl_key" ON "Character"("imageUrl");
