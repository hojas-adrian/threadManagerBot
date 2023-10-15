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

export const action = async (
  ctx: MyContext,
  command: "mute" | "kick" | "ban",
) => {
  const actions = {
    mute: "silenciado",
    kick: "expulsado",
    ban: "baneado",
  };

  const userAlias = ctx.message?.reply_to_message?.from?.username;
  const userName = ctx.message?.reply_to_message?.from?.first_name;
  const userLastName = ctx.message?.reply_to_message?.from?.last_name;
  const action = actions[command];

  await ctx.reply(
    `has ${action} al usuario ${
      userAlias ? `@${userAlias}` : `${userName} ${userLastName ?? ""}`
    }`,
    {
      reply_to_message_id: ctx.message?.message_id,
    },
  );
};
