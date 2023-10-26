import { MyContext } from "../helpers/context.ts";

export default async (ctx: MyContext) => {
  const isReply = ctx.message?.reply_to_message;
  const messageId = ctx.message?.reply_to_message?.message_id || NaN;

  if (!isReply) {
    return await ctx.reply("debes responder a un mensaje", {
      reply_to_message_id: ctx.message?.message_id,
    });
  }

  await ctx.unpinChatMessage(messageId);
};
