import { MyContext } from "../../../helpers/context.ts";
import { sendMessage } from "../../../helpers/output.ts";
import { matchOne } from "./functions.ts";

export default async (ctx: MyContext) => {
  const channelId = ctx.message?.message_thread_id || NaN;
  channelId;
  if (ctx.match) {
    const chats = typeof (ctx.match) == "string" && ctx.match.split(" ");
    (chats && chats.length === 1)
      ? await sendMessage(await matchOne(ctx, chats), ctx)
      : await sendMessage({ status: "fail", cause: "many_arguments" }, ctx);
  } else {
    await sendMessage({ status: "fail", cause: "many_arguments" }, ctx);
  }
};
