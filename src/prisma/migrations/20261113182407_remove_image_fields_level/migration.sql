/*
  Warnings:

  - You are about to drop the column `heightPx` on the `Level` table. All the data in the column will be lost.
  - You are about to drop the column `widthPx` on the `Level` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Level" DROP COLUMN "heightPx",
DROP COLUMN "widthPx";
