import { MyContext } from "../helpers/context.ts";
import { send } from "../helpers/utils.ts";

export default (ctx: MyContext) => {
  const channelId = ctx.message?.message_thread_id;
  const channel = channelId &&
    ctx.session.threads[channelId];

  if (channel) {
    channel.forEach(async (threadId) => {
      const post = await send(ctx, threadId);
      await ctx.pinChatMessage(post.message_id);
    });
  }
};
