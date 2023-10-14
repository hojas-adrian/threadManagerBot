import { MyContext } from "./context.ts";

export const getLink = (ctx: MyContext, threadId: number) => {
  const chatId = ctx.chat?.id || NaN;

  return `t.me/c/${chatId.toString().slice(4)}/${
    threadId === 1 ? "" : threadId
  }`;
};

export const send = async (ctx: MyContext, threadId: number) => {
  const chatId = ctx.chat?.id || NaN;

  return await ctx.forwardMessage(chatId, {
    ...(threadId !== 1 && { message_thread_id: threadId }),
  });
};
