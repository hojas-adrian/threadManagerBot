import { MyContext } from "../helpers/context.ts";

export default async (ctx: MyContext) => {
  await ctx.reply(
    `chat Id:${ctx.chat?.id}\nthread Id:${
      ctx.message?.message_thread_id ?? 1
    }\n`,
  );
};
