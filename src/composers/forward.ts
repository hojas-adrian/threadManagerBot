import { Composer } from "../../deps.ts";

const composer = new Composer();

composer.use(async (ctx) => await ctx.reply("reenvio"));

export default composer;
