import { MyContext } from "../helpers/context.ts";

const matchOne = (ctx: MyContext, chat: string): string => {
  const channelId = ctx.message?.message_thread_id || NaN;
  const currentThread = channelId && ctx.session.threads[channelId];
  const chatIndex = currentThread !== 0 &&
    currentThread.indexOf(parseInt(chat));

  if (chatIndex === false) {
    return "no extiste el chat";
  }
  currentThread && currentThread.splice(chatIndex, 1);
  return "el chat se elimino";
};

export default (ctx: MyContext) => {
  let output: string;

  if (ctx.match) {
    const chats = typeof (ctx.match) == "string" && ctx.match.split(" ");
    (chats && chats.length === 1)
      ? output = matchOne(ctx, chats[0])
      : output = "no puedo manejar multiples argumentos";
  } else {
    output = "no puedo manejar multiples argumentos";
  }

  ctx.reply(output, {
    reply_to_message_id: ctx.message?.message_id,
  });
};
