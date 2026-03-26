import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { messagesTable, telegramUsersTable } from "@workspace/db";
import { count, gte, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/stats", async (req, res) => {
  try {
    const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const [
      totalMessagesResult,
      totalUsersResult,
      messagesLast24hResult,
      activeUsersLast24hResult,
    ] = await Promise.all([
      db.select({ count: count() }).from(messagesTable),
      db.select({ count: count() }).from(telegramUsersTable),
      db
        .select({ count: count() })
        .from(messagesTable)
        .where(gte(messagesTable.createdAt, since24h)),
      db
        .selectDistinct({ userId: messagesTable.userId })
        .from(messagesTable)
        .where(gte(messagesTable.createdAt, since24h)),
    ]);

    res.json({
      totalMessages: totalMessagesResult[0]?.count ?? 0,
      totalUsers: totalUsersResult[0]?.count ?? 0,
      messagesLast24h: messagesLast24hResult[0]?.count ?? 0,
      activeUsersLast24h: activeUsersLast24hResult.length,
    });
  } catch (err) {
    req.log.error({ err }, "Error fetching stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
