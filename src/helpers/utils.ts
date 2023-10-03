import { MyContext } from "./context.ts";

export async function replyInTopic(
  ctx: MyContext,
  text: string,
  optional?:
    | { threadId: number } & { replyToMessage?: never }
    | { replyToMessage: boolean } & { threadId?: never },
) {
  const groupId = ctx.chat?.id ?? NaN;
  const threadId = (optional && optional.threadId) ?? (ctx.message?.is_topic_message && ctx.message?.message_thread_id)
  const messageId =
    ((optional && optional.replyToMessage) && ctx.message?.message_id) ||
    undefined;

  await ctx.api.sendMessage(
    groupId,
    text,
    {
      reply_to_message_id: messageId,
      ...(threadId && { message_thread_id: threadId }),
    },
  );
}
