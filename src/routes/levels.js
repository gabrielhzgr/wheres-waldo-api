import express from "express";
import cors from "cors";
import { prisma } from "../lib/prisma.js";
import "dotenv/config";
import crypto from "node:crypto";
import errors from "../errors/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const levels = await prisma.level.findMany({
    include: {
      positions: {
        select: {
          character: { select: { id: true, name: true, imageUrl: true } },
        },
      },
    },
  });
  return res.json({ levels });
});

router.get("/:levelId/new-game", async (req, res) => {
  const { levelId } = req.params;
  const level = await prisma.level.findFirst({
    where: { id: Number(levelId) },
  });
  if (level) {
    res.cookie("recordId", crypto.randomUUID(), {
      httpOnly: true,
      signed: true,
    });
    res.cookie("startTime", Date.now(), { httpOnly: true, signed: true });
    res.cookie("correct", "{}", { httpOnly: true, signed: true });
    return res.json({ success: true });
  } else {
    throw new errors.NotFoundError("This level does not exist");
  }
});

router.post("/:levelId/place-character", async (req, res) => {
  if (req.signedCookies["recordId"]) {
    let { levelId } = req.params;
    levelId = Number(levelId);
    const { x, y, characterId } = req.body;
    let { positions } = await prisma.level.findFirst({
      where: { id: levelId },
      include: { positions: { include: { character: true } } },
    });
    let position = positions.filter((position) => {
      return position.characterId == characterId;
    });

    if (position.length == 0) {
      return res.json({
        status: "failed",
        message: "This character is not in this level",
      });
    } else {
      position = position[0];
      const match =
        position.startX <= x &&
        position.endX >= x &&
        position.startY <= y &&
        position.endY >= y;
      let correct = JSON.parse(req.signedCookies["correct"]);

      if (position.characterId in correct) {
        return res.json({
          status: "failed",
          message: "You already selected this character",
        });
      } else if (match) {
        correct = { ...correct, [characterId]: true };
        res.cookie("correct", JSON.stringify(correct), {
          httpOnly: true,
          signed: true,
        });
        if (Object.keys(correct).length == positions.length) {
          const endTime = Date.now();
          res.cookie("endTime", endTime, { httpOnly: true, signed: true });
          const seconds =
            (endTime - Number(req.signedCookies["startTime"])) / 1000;
          const records = await prisma.record.findMany({
            where: { levelId },
            orderBy: { timeSeconds: "asc" },
          });
          return res.json({
            status: "completed",
            message: "Congratulations you completed the game!",
            time: seconds,
            records,
          });
        }
        return res.json({
          status: "correct",
          message: `You guessed ${position.character.name} correctly!`,
        });
      } else {
        return res.json({
          status: "failed",
          message: `You guessed ${position.character.name} incorrectly`,
        });
      }
    }
  } else {
    throw new errors.NotAllowed("You must start a game first");
  }
});

router.post("/:levelId/new-record", async (req, res) => {
  if (req.signedCookies["recordId"]) {
    if (!req.signedCookies["startTime"]) {
      throw new errors.NotAllowed("You must start a game first");
    }

    if (!req.signedCookies["endTime"]) {
      throw new errors.NotAllowed("You have't ended the game yet");
    }
    const { recordId: id } = req.signedCookies["recordId"];
    const { username } = req.body;
    const { startTime } = req.signedCookies["startTime"];
    const { endTime } = req.signedCookies["endTime"];
    const timeSeconds = (endTime - startTime) / 1000;

    await prisma.record.create({
      data: { id, username, timeSeconds },
    });
    const records = await prisma.record.findMany({
      where: { levelId },
      orderBy: { timeSeconds: "asc" },
    });
    return res.json({ records });
  }
});

export default router;
