import channelHandler from "../commands/functions/channel/handler.ts";
import unchannelHandler from "../commands/functions/unchannel/handler.ts";
import banHandler from "../commands/functions/ban/banHandler.ts";
import hearHandler from "../commands/functions/hear/hearHandler.ts";
import kickHandler from "../commands/functions/kick/kickHandler.ts";
import muteHandler from "../commands/functions/mute/muteHandler.ts";
import pinHandler from "../commands/functions/pin/pinHandler.ts";

export const commands = {
  channel: {
    name: "channel",
    trgger: "",
    description: "description",
    handler: channelHandler,
  },
  unchannel: {
    name: "unchannel",
    trgger: "unchannel",
    description: "description",
    handler: unchannelHandler,
  },
  ban: {
    name: "ban",
    trigger: ["ban"],
    description: "description",
    handler: banHandler,
  },
  hear: {
    name: "hear",
    trigger: "hola",
    description: "description",
    handler: hearHandler,
  },
  kick: {
    name: "hear",
    trigger: "a",
    description: "description",
    handler: kickHandler,
  },
  mute: {
    name: "hear",
    trigger: "a",
    description: "description",
    handler: muteHandler,
  },
  pin: {
    name: "hear",
    trigger: "a",
    description: "description",
    handler: pinHandler,
  },
};
