/*
  Warnings:

  - You are about to drop the column `imageId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `levelId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelId` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_imageId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "imageId",
ADD COLUMN     "levelId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "imageId",
ADD COLUMN     "levelId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "widthPx" INTEGER NOT NULL,
    "heightPx" INTEGER NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Level_imageUrl_key" ON "Level"("imageUrl");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
