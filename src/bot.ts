import { autoRetry, Bot, load, session } from "../deps.ts";
import { getSessionKey, initial } from "./helpers/session.ts";
import commands from "./commands/_commands.ts";
import commandList from "./composers/commandList.ts";
import forward from "./composers/forward.ts";
import { MyContext } from "./helpers/context.ts";

const env = await load();
const bot = new Bot<MyContext>(env["BOT_TOKEN"]);

bot.api.config.use(autoRetry());
bot.use(session({
  getSessionKey,
  initial,
}));

bot.use(commandList);
bot.command("session", (ctx) => console.log(ctx.session));
bot.use(commands);

bot
  .use(forward);

bot.start();
