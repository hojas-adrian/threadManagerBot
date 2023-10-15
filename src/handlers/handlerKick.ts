import { MyContext } from "../helpers/context.ts";
import { action } from "../helpers/utils.ts";

export default async (ctx: MyContext) => {
  const user = ctx.message?.reply_to_message?.from?.id || NaN;

  await ctx.banChatMember(user);
  await ctx.unbanChatMember(user);
  action(ctx, "kick");
};
