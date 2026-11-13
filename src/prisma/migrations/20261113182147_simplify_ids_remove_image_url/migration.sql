-- CreateTable
CREATE TABLE "Level" (
    "name" TEXT NOT NULL,
    "widthPx" INTEGER NOT NULL,
    "heightPx" INTEGER NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Position" (
    "levelName" TEXT NOT NULL,
    "characterName" TEXT NOT NULL,
    "startX" INTEGER NOT NULL,
    "endX" INTEGER NOT NULL,
    "startY" INTEGER NOT NULL,
    "endY" INTEGER NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("levelName","characterName")
);

-- CreateTable
CREATE TABLE "Character" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "timeSeconds" INTEGER NOT NULL,
    "levelName" TEXT NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Record_username_key" ON "Record"("username");

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_levelName_fkey" FOREIGN KEY ("levelName") REFERENCES "Level"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_characterName_fkey" FOREIGN KEY ("characterName") REFERENCES "Character"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_levelName_fkey" FOREIGN KEY ("levelName") REFERENCES "Level"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
