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
  command: "mute" | "unmute" | "kick" | "ban" | "unban",
) => {
  const admins = await ctx.getChatAdministrators();

  const userAlias = ctx.message?.reply_to_message?.from?.username;
  const userName = ctx.message?.reply_to_message?.from?.first_name;
  const userLastName = ctx.message?.reply_to_message?.from?.last_name;

  const actions1 = {
    ban: {
      actionText: "baneado",
      async fn(userId: number) {
        await ctx.banChatMember(userId);
      },
    },
    unban: {
      actionText: "desbaneado",
      async fn(userId: number) {
        await ctx.unbanChatMember(userId);
      },
    },
    mute: {
      actionText: "silenciado",
      async fn(userId: number) {
        await ctx.restrictChatMember(userId, { can_send_messages: false });
      },
    },
    unmute: {
      actionText: "desilenciado",
      async fn(userId: number) {
        await ctx.restrictChatMember(userId, { can_send_messages: true });
      },
    },
    kick: {
      actionText: "expulsado",
      async fn(userId: number) {
        await ctx.banChatMember(userId);
        await ctx.unbanChatMember(userId);
      },
    },
  };

  let userId = ctx.message?.reply_to_message?.from?.id;
  let reason = ctx.match;

  if (!ctx.reply) {
    const match = (ctx.match as string)?.split(" ");
    const user = parseInt(match?.shift() || "");

    userId =
      (ctx.message?.entities && ctx.message.entities[1]?.type == "text_mention")
        ? ctx.message.entities[1].user.id
        : user;

    reason = match?.join(" ");
  }

  if (!userId) {
    return "debes responder un mensaje o agregar un usario";
  }

  if (admins.some((admin) => admin.user.id == userId)) {
    return "no puedes banear a un administrador";
  }

  try {
    await actions1[command].fn(userId);
    return `has ${actions1[command].actionText} al usuario ${
      userAlias
        ? `@${userAlias}`
        : `${userName} ${userLastName ?? ""} ${
          reason ? `\nMotivo: ${reason}` : ""
        }`
    }`;
  } catch (e) {
    console.log(e);
    return "no se puedo completar la accion";
  }
};
