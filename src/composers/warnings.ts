import { Composer } from "../../deps.ts";

export const checkTopicCommand = new Composer();

checkTopicCommand.filter((ctx) =>
  !(ctx.chat?.type === "supergroup" && ctx.chat.is_forum)
)
  .use(async (ctx) =>
    await ctx.reply("Esto no es un forum", {
      reply_to_message_id: ctx.message?.message_id,
    })
  );

checkTopicCommand.filter(async (ctx) => {
  const admins = await ctx.api.getChatAdministrators(`${ctx.chat?.id}`);
  return !admins.some((admin) => admin.user.id == ctx.from?.id);
})
  .use(async (ctx) =>
    await ctx.reply("tienes que ser admin", {
      reply_to_message_id: ctx.message?.message_id,
    })
  );
