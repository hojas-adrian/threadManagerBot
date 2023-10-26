import { MyContext } from "../helpers/context.ts";

const addChanel = async (
  ctx: MyContext,
  chat: string,
): Promise<string> => {
  const channelId = ctx.message?.message_thread_id || NaN;
  const currentThread = channelId && ctx.session.threads[channelId];
  const chatId = parseInt(chat);

  //es el mismo
  if (chatId === channelId) {
    return "el chat es el mismo";
  }
  //existe en la session
  if (currentThread && currentThread.includes(chatId)) {
    return "el chat ya existia";
  }

  try {
    typeof (ctx.chat?.id) === "number" &&
      (chatId === 1
        ? await ctx.api.sendMessage(
          ctx.chat?.id,
          "ahora este chat recibe mensajes de este canal",
        )
        : await ctx.api.sendMessage(
          ctx.chat?.id,
          "ahora este chat recibe mensajes de este canal",
          {
            message_thread_id: chatId,
          },
        ));

    //no existe el chat
    (!currentThread) && (ctx.session.threads[channelId] = []);
    ctx.session.threads[channelId].push(chatId);

    return "el chat ya se agrego";
  } catch (error) {
    error;
    return "no extiste el chat";
  }
};

const addChanelToGeneral = (ctx: MyContext): string => {
  const channelId = ctx.message?.message_thread_id || NaN;
  const currentThread = channelId &&
    ctx.session.threads[channelId];

  if (currentThread && currentThread.includes(1)) {
    return "el chat ya existia";
  }

  ctx.session.threads[channelId] ??= [];
  ctx.session.threads[channelId].push(1);
  return "el chat ya se agrego";
};

export default async (ctx: MyContext) => {
  let output: string;

  if (!ctx.message?.is_topic_message) {
    ctx.reply("no puedes usar este comando en el grupo general", {
      reply_to_message_id: ctx.message?.message_id,
    });
    return;
  }
  if (ctx.match) {
    const chats = ctx.match.toString();
    chats.length === 1
      ? output = await addChanel(ctx, chats[0])
      : output = "no puedo manejar multiples argumentos";
  } else {
    output = addChanelToGeneral(ctx);
  }
  ctx.reply(output, {
    reply_to_message_id: ctx.message?.message_id,
  });
};
