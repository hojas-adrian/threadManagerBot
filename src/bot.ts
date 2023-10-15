import { Bot, GrammyError, HttpError, load, session } from "../deps.ts";
import { getSessionKey, initial } from "./helpers/session.ts";
import commands from "./composers/commands.ts";
import forward from "./composers/forward.ts";
import { MyContext } from "./helpers/context.ts";

const env = await load();
export const bot = new Bot<MyContext>(
  Deno.env.get("BOT_TOKEN") || env["BOT_TOKEN"],
);

bot.use(session({
  getSessionKey,
  initial,
}));

bot.use(commands);
bot.use(forward);

bot.catch(({ ctx, error }) => {
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  if (error instanceof GrammyError) {
    console.error("Error in request:", error.description);
  } else if (error instanceof HttpError) {
    console.error("Could not contact Telegram:", error);
  } else {
    console.error("Unknown error:", error);
  }
});
