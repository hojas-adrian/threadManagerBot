import { Composer } from "../../deps.ts";
import { MyContext } from "../helpers/context.ts";
import { ban, channel, hear, kick, mute, pin, unchannel } from "./_siwtcher.ts";

import { commands } from "../helpers/commands.ts";

const composer = new Composer<MyContext>();

composer
  .command("start", async (ctx) => await ctx.reply("help"))
  .command("help", async (ctx) => await ctx.reply("help"))
  .command("settings", async (ctx) => await ctx.reply("settings"));

composer.command("channel").use(channel);
composer.command("unchannel").use(unchannel);
composer.command("hear").use(hear);

composer.filter((ctx) => ctx.session.adminRol)
  .command(commands.ban.trigger).use(ban)
  .command(commands.mute.trigger).use(mute)
  .command("kick").use(kick)
  .command("pin").use(pin);

export default composer;
