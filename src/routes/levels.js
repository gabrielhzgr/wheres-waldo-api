import express from "express";
import { prisma } from "../lib/prisma.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const levels = await prisma.level.findMany();
  res.json({ levels });
});

export default router;
