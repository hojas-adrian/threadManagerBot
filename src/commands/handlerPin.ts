import { MyContext } from "../helpers/context.ts";

export default async (ctx: MyContext) => {
  const user = ctx.message?.reply_to_message?.from?.id || NaN;
  ctx.restrictChatMember(user, { can_send_messages: false });
};
