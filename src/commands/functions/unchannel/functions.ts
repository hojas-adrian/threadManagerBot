import { MyContext } from "../../../helpers/context.ts";
import { Message } from "../../../helpers/output.ts";

export const matchOne = (ctx: MyContext, chats: string[]): Message => {
  const channelId = ctx.message?.message_thread_id || NaN;
  const currentThread = channelId && ctx.session.threads[channelId];
  const chatIndex = currentThread !== 0 &&
    currentThread.indexOf(parseInt(chats[0]));
  let output: Message;

  chatIndex === false
    ? output = { status: "fail", cause: "threadDontExist" }
    : (currentThread && currentThread.splice(chatIndex, 1),
      output = { status: "sucsses", cause: "threadDone" });

  return output;
};
