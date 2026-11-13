/*
  Warnings:

  - The primary key for the `Character` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Level` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Position` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `characterName` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `levelName` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `levelName` on the `Record` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageUrl]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Level` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageUrl]` on the table `Level` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageUrl` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelId` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelId` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_characterName_fkey";

-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_levelName_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_levelName_fkey";

-- DropIndex
DROP INDEX "Record_username_key";

-- AlterTable
ALTER TABLE "Character" DROP CONSTRAINT "Character_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD CONSTRAINT "Character_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Level" DROP CONSTRAINT "Level_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD CONSTRAINT "Level_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Position" DROP CONSTRAINT "Position_pkey",
DROP COLUMN "characterName",
DROP COLUMN "levelName",
ADD COLUMN     "characterId" INTEGER NOT NULL,
ADD COLUMN     "levelId" INTEGER NOT NULL,
ADD CONSTRAINT "Position_pkey" PRIMARY KEY ("levelId", "characterId");

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "levelName",
ADD COLUMN     "levelId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Character_imageUrl_key" ON "Character"("imageUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Level_name_key" ON "Level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Level_imageUrl_key" ON "Level"("imageUrl");

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
