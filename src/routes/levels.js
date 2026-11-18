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
    res.cookie("levelId", "hola", { httpOnly: true });
    res.cookie("gameId", crypto.randomUUID(), { httpOnly: true });
    res.cookie("startTime", Date.now(), { httpOnly: true });
    return res.json({ success: true });
  } else {
    throw new errors.NotFoundError("This level does not exist");
  }
});

router.post("/end-game", (req, res) => {
  if (req.cookies.gameId) {
    return res.json(req.body);
  } else {
    throw new errors.NotAllowed("You must start a game first");
  }
});

export default router;
