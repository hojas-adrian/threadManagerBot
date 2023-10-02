import { MyContext } from "../../../helpers/context.ts";
import { Message } from "../../../helpers/output.ts";

export const matchOne = async (
  ctx: MyContext,
  chats: string[],
): Promise<Message> => {
  const channelId = ctx.message?.message_thread_id || NaN;
  const currentThread = channelId && ctx.session.threads[channelId];
  const chatId = parseInt(chats[0]);

  //es el mismo
  if (chatId === channelId) {
    return { status: "fail", cause: "threadIsSame" };
  }
  //existe en la session
  if (currentThread && currentThread.includes(chatId)) {
    return { status: "fail", cause: "threadExist" };
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

    return { status: "sucsses", cause: "threadDone" };
  } catch (error) {
    error;
    return { status: "fail", cause: "threadDontExist" };
  }
};

export const matchEmpty = (ctx: MyContext) => {
  const channelId = ctx.message?.message_thread_id || NaN;
  const currentThread = channelId && ctx.session.threads[channelId];
  let output: Message;

  currentThread && currentThread.includes(1)
    ? output = { status: "fail", cause: "threadExist" }
    : (ctx.session.threads[channelId] ??= [],
      ctx.session.threads[channelId].push(1),
      output = { status: "sucsses", cause: "threadDone" });

  return output;
};
