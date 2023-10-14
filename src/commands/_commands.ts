import { Composer } from "../../deps.ts";
import { MyContext } from "../helpers/context.ts";
import { checkTopicCommand } from "../composers/warnings.ts";
import channelHandler from "./handlerChannel.ts";
import unchannelHandler from "./handlerUnchannel.ts";
import hearHandler from "./handlerHear.ts";
import unHearHandler from "./handlerUnhear.ts";
import infoHandler from "./handlerInfo.ts";
import banHandler from "./handlerBan.ts";
import muteHandler from "./handlerMute.ts";
import kickHandler from "./handlerKick.ts";
import pinHandler from "./handlerPin.ts";

const composer = new Composer<MyContext>();

composer
  .command("start", async (ctx) => await ctx.reply("help"))
  .command("help", async (ctx) => await ctx.reply("help"))
  .command("settings", async (ctx) => await ctx.reply("settings"));

composer.command("channel", checkTopicCommand, channelHandler);
composer.command("unchannel", checkTopicCommand, unchannelHandler);
composer.command("hear", checkTopicCommand, hearHandler);
composer.command("unhear", checkTopicCommand, unHearHandler);
composer.command("info", checkTopicCommand, infoHandler);

composer.command("new", checkTopicCommand, (ctx) => ctx.reply("textp"));

composer.filter((ctx) => ctx.session.adminRol)
  .command("ban", banHandler)
  .command("mute", muteHandler)
  .command("kick", kickHandler)
  .command("pin", pinHandler);

export default composer;
