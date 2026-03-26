import { Router, type IRouter } from "express";
import { Bot } from "grammy";
import { db } from "@workspace/db";
import { telegramUsersTable, messagesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const BOT_TOKEN = process.env["TELEGRAM_BOT_TOKEN"];
const WEBHOOK_SECRET = process.env["TELEGRAM_WEBHOOK_SECRET"];

let bot: Bot | null = null;

if (BOT_TOKEN) {
  bot = new Bot(BOT_TOKEN);

  bot.command("start", async (ctx) => {
    await ctx.reply(
      "¡Hola! Soy el bot del proyecto Buildathon. Escríbeme algo y lo guardaré.",
    );
  });

  bot.on("message:text", async (ctx) => {
    const from = ctx.message.from;
    const text = ctx.message.text;

    try {
      let user = await db.query.telegramUsersTable.findFirst({
        where: eq(telegramUsersTable.telegramId, from.id),
      });

      if (!user) {
        const [created] = await db
          .insert(telegramUsersTable)
          .values({
            telegramId: from.id,
            username: from.username ?? null,
            firstName: from.first_name,
            lastName: from.last_name ?? null,
          })
          .returning();
        user = created;
      }

      if (user) {
        await db.insert(messagesTable).values({
          telegramMessageId: ctx.message.message_id,
          userId: user.id,
          text,
          direction: "incoming",
        });

        const reply = `Recibí tu mensaje: "${text}"`;
        await ctx.reply(reply);

        await db.insert(messagesTable).values({
          telegramMessageId: ctx.message.message_id + 1,
          userId: user.id,
          text: reply,
          direction: "outgoing",
        });
      }
    } catch (err) {
      logger.error({ err }, "Error handling Telegram message");
    }
  });
}

// Middleware to validate Telegram webhook secret token
function validateWebhookSecret(
  req: Parameters<Parameters<typeof router.post>[1]>[0],
  res: Parameters<Parameters<typeof router.post>[1]>[1],
  next: Parameters<Parameters<typeof router.post>[1]>[2],
) {
  if (WEBHOOK_SECRET) {
    const header = req.headers["x-telegram-bot-api-secret-token"];
    if (header !== WEBHOOK_SECRET) {
      res.status(403).json({ ok: false, error: "Forbidden" });
      return;
    }
  }
  next();
}

router.post("/telegram/webhook", validateWebhookSecret, async (req, res) => {
  if (!bot) {
    res.status(503).json({ ok: false, error: "Bot not configured. Set TELEGRAM_BOT_TOKEN." });
    return;
  }

  try {
    await bot.handleUpdate(req.body);
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Webhook error");
    res.status(500).json({ ok: false });
  }
});

// Auto-register webhook on startup if WEBHOOK_URL is provided
export async function registerWebhook() {
  if (!bot || !BOT_TOKEN) return;

  const webhookUrl = process.env["TELEGRAM_WEBHOOK_URL"];
  if (!webhookUrl) {
    logger.info("TELEGRAM_WEBHOOK_URL not set — skipping webhook registration");
    return;
  }

  try {
    const params: Record<string, string> = { url: webhookUrl };
    if (WEBHOOK_SECRET) params["secret_token"] = WEBHOOK_SECRET;

    const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = await response.json() as { ok: boolean; description?: string };

    if (data.ok) {
      logger.info({ webhookUrl }, "Telegram webhook registered successfully");
    } else {
      logger.warn({ data }, "Failed to register Telegram webhook");
    }
  } catch (err) {
    logger.error({ err }, "Error registering Telegram webhook");
  }
}

export { bot };
export default router;
