import { MyContext } from "../helpers/context.ts";

export default async (ctx: MyContext) => {
  const isReply = ctx.message?.reply_to_message;
  let output = `chat Id:${ctx.chat?.id}\nthread Id:${
    ctx.message?.message_thread_id ?? 1
  }\n`;

  if (!isReply) {
    output =
      `User Id: ${ctx.chat?.id}\nName: ${ctx.message?.from.first_name} ${ctx.message?.from.last_name} \nUser name: ${ctx.message?.from.username}`;
  }

  return await ctx.reply(output, {
    reply_to_message_id: ctx.message?.message_id,
  });
};
