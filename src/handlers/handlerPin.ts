import { MyContext } from "../helpers/context.ts";

export default async (ctx: MyContext) => {
  const messageId = ctx.message?.reply_to_message?.message_id || NaN;
  await ctx.pinChatMessage(messageId);
};
