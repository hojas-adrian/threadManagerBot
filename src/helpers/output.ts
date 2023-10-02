import { MyContext } from "./context.ts";

const messages = {
  status: {
    sucsses: "✅",
    fail: "❌",
  },
  channel: {
    threadExist: "el chat ya existia",
    threadDone: "el chat ya se agrego",
    threadIsSame: "el chat es el mismo",
    threadDontExist: "no extiste el chat",
    many_arguments: "no puedo manejar multiples argumentos",
  },
  hear: {},
};

export interface Message {
  status: "fail" | "sucsses";
  cause:
    | "threadExist"
    | "threadDone"
    | "threadIsSame"
    | "threadDontExist"
    | "many_arguments";
}

export async function sendMessage(
  { status, cause }: Message,
  ctx: MyContext,
) {
  const groupId = ctx.chat?.id || NaN;
  const channelId = ctx.message?.message_thread_id || NaN;

  await ctx.api.sendMessage(
    groupId,
    `${messages.status[status]} ${messages.channel[cause]}`,
    {
      message_thread_id: channelId,
    },
  );
}
