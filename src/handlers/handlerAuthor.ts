import { MyContext } from "../helpers/context.ts";

export default (ctx: MyContext) => {
  ctx.reply("code is art", {
    reply_to_message_id: ctx.message?.message_id,
  });
};
