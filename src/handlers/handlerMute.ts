import { MyContext } from "../helpers/context.ts";
import { action } from "../helpers/utils.ts";

export default async (ctx: MyContext) => {
  ctx.reply(await action(ctx, "mute"), {
    reply_to_message_id: ctx.message?.message_id,
  });
};
