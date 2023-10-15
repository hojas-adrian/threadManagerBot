import { MyContext } from "../helpers/context.ts";
import { action } from "../helpers/utils.ts";

export default async (ctx: MyContext) => {
  const user = ctx.message?.reply_to_message?.from?.id || NaN;

  await ctx.restrictChatMember(user, { can_send_messages: false });
  action(ctx, "mute");
};
