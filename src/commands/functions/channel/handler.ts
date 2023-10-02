import { MyContext } from "../../../helpers/context.ts";
import { matchEmpty, matchOne } from "./functions.ts";
import { sendMessage } from "../../../helpers/output.ts";

export default async (ctx: MyContext) => {
  const channelId = ctx.message?.message_thread_id || NaN;

  if (!channelId) {
    await ctx.reply("el tema general no puede ser un canal");
    return;
  }
  if (ctx.match) {
    const chats = typeof (ctx.match) == "string" && ctx.match.split(" ");
    (chats && chats.length === 1)
      ? await sendMessage(await matchOne(ctx, chats), ctx)
      : await sendMessage({ status: "fail", cause: "many_arguments" }, ctx);
  } else {
    await sendMessage(matchEmpty(ctx), ctx);
  }
};
