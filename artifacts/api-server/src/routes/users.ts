import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { telegramUsersTable } from "@workspace/db";
import { asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/users", async (req, res) => {
  try {
    const users = await db
      .select()
      .from(telegramUsersTable)
      .orderBy(asc(telegramUsersTable.createdAt));

    res.json(users);
  } catch (err) {
    req.log.error({ err }, "Error fetching users");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
