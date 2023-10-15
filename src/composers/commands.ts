import { Composer } from "../../deps.ts";
import { MyContext } from "../helpers/context.ts";
import { checkAdminCommand, checkTopicCommand } from "./warnings.ts";

import startHandler from "../handlers/handlerStart.ts";
import helpHandler from "../handlers/handlerHelp.ts";
import settingsHandler from "../handlers/handlerSettings.ts";
import channelHandler from "../handlers/handlerChannel.ts";
import unChannelHandler from "../handlers/handlerUnchannel.ts";
import hearHandler from "../handlers/handlerHear.ts";
import unHearHandler from "../handlers/handlerUnhear.ts";
import infoHandler from "../handlers/handlerInfo.ts";
import newTopicHandler from "../handlers/handlerNew.ts";
import closeTopicHandler from "../handlers/handlerClose.ts";
import openTopicHandler from "../handlers/handlerOpen.ts";
import banHandler from "../handlers/handlerBan.ts";
import unBanHandler from "../handlers/handlerUnban.ts";
import muteHandler from "../handlers/handlerMute.ts";
import unMuteHandler from "../handlers/handlerUnmute.ts";
import kickHandler from "../handlers/handlerKick.ts";
import pinHandler from "../handlers/handlerPin.ts";
import unPinHandler from "../handlers/handlerUnpin.ts";

const composer = new Composer<MyContext>();

composer.command("start", startHandler);
composer.command("help", helpHandler);
composer.command("settings", settingsHandler);

composer.command("channel", checkTopicCommand, channelHandler);
composer.command("unchannel", checkTopicCommand, unChannelHandler);
composer.command("hear", checkTopicCommand, hearHandler);
composer.command("unhear", checkTopicCommand, unHearHandler);

composer.command("info", checkTopicCommand, infoHandler);
composer.command("new", checkTopicCommand, newTopicHandler);
composer.command("close", checkTopicCommand, closeTopicHandler);
composer.command("open", checkTopicCommand, openTopicHandler);

composer.command("ban", checkAdminCommand, banHandler);
composer.command("unban", checkAdminCommand, unBanHandler);
composer.command("mute", checkAdminCommand, muteHandler);
composer.command("unmute", checkAdminCommand, unMuteHandler);
composer.command("kick", checkAdminCommand, kickHandler);
composer.command("pin", checkAdminCommand, pinHandler);
composer.command("unpin", checkAdminCommand, unPinHandler);

export default composer;
