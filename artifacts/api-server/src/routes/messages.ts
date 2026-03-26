import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { messagesTable, telegramUsersTable } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";
import { GetMessagesQueryParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/messages", async (req, res) => {
  const parsed = GetMessagesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query parameters" });
    return;
  }

  const { limit = 50, offset = 0, userId } = parsed.data;

  try {
    const conditions = userId
      ? eq(messagesTable.userId, userId)
      : undefined;

    const [messages, totalResult] = await Promise.all([
      db
        .select({
          id: messagesTable.id,
          telegramMessageId: messagesTable.telegramMessageId,
          userId: messagesTable.userId,
          text: messagesTable.text,
          direction: messagesTable.direction,
          createdAt: messagesTable.createdAt,
          user: {
            id: telegramUsersTable.id,
            telegramId: telegramUsersTable.telegramId,
            username: telegramUsersTable.username,
            firstName: telegramUsersTable.firstName,
            lastName: telegramUsersTable.lastName,
            createdAt: telegramUsersTable.createdAt,
          },
        })
        .from(messagesTable)
        .innerJoin(
          telegramUsersTable,
          eq(messagesTable.userId, telegramUsersTable.id),
        )
        .where(conditions)
        .orderBy(desc(messagesTable.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: count() })
        .from(messagesTable)
        .where(conditions),
    ]);

    res.json({
      messages,
      total: totalResult[0]?.count ?? 0,
    });
  } catch (err) {
    req.log.error({ err }, "Error fetching messages");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
