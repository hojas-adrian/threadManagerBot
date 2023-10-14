import { Composer } from "../../deps.ts";

export const checkTopicCommand = new Composer();

checkTopicCommand.chatType("private").use(async (ctx) =>
  await ctx.reply("Esto no es un forum", {
    reply_to_message_id: ctx.message?.message_id,
  })
);

checkTopicCommand
  .filter(async (ctx) => {
    const admins = await ctx.getChatAdministrators();
    return !admins.some((admin) => admin.user.id == ctx.from?.id);
  })
  .use((ctx) => ctx.reply("pipi"));

checkTopicCommand
  .filter((ctx) => !(ctx.chat?.type === "supergroup" && ctx.chat.is_forum))
  .use(async (ctx) =>
    await ctx.reply("Esto no es un forum", {
      reply_to_message_id: ctx.message?.message_id,
    })
  );

checkTopicCommand.filter(async (ctx) => {
  const admins = await ctx.getChatAdministrators();
  const bot = admins.find((admin) => admin.user.id == ctx.me.id);

  return !(bot?.status == "administrator" && bot?.can_pin_messages) ||
    !(bot?.status == "administrator" && bot?.can_manage_topics);
})
  .use(async (ctx) => {
    const admins = await ctx.getChatAdministrators();
    const bot = admins.find((admin) => admin.user.id == ctx.me.id);

    const canPin = bot?.status == "administrator" && bot?.can_pin_messages;
    const canManageTopics = bot?.status == "administrator" &&
      bot?.can_manage_topics;

    await ctx.reply(
      `el bot debe:\n${bot ? "✅" : "❌"} Ser administrador\n${
        canPin ? "✅" : "❌"
      } fijar mensajes \n${canManageTopics ? "✅" : "❌"} administrar topics`,
      {
        reply_to_message_id: ctx.message?.message_id,
      },
    );
  });
