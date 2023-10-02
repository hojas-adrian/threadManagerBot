import { Composer } from "../../deps.ts";

const composer = new Composer();

composer.filter((ctx) =>
  !(ctx.chat?.type === "supergroup" && ctx.chat.is_forum)
)
  .use(async (ctx) => await ctx.reply("Esto no es un forum"));

composer.filter(async (ctx) => {
  const admins = await ctx.api.getChatAdministrators(`${ctx.chat?.id}`);
  return !admins.some((admin) => admin.user.id == ctx.from?.id);
})
  .use(async (ctx) => await ctx.reply("tienes que ser admin"));

export default composer;
