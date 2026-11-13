import express from "express";
import { prisma } from "../lib/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const levels = await prisma.level.findMany({
    include: {
      positions: {
        select: { character: { select: { name: true, imageUrl: true } } },
      },
    },
  });
  res.json({ levels });
});

export default router;
