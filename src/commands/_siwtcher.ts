import { Composer } from "../../deps.ts";
import { MyContext } from "../helpers/context.ts";
import { commands } from "../helpers/commands.ts";
import warnings from "../composers/warnings.ts";

export const channel = new Composer<MyContext>();
channel.use(warnings);
channel.use(commands["channel"].handler);

export const unchannel = new Composer<MyContext>();
unchannel.use(warnings);
unchannel.use(commands["unchannel"].handler);

export const ban = new Composer<MyContext>();
ban.use(warnings);
ban.use(commands["ban"].handler);

export const hear = new Composer();
hear.use(warnings);
hear.use(() => console.log("hi"));

export const kick = new Composer();
kick.use(warnings);
kick.use(() => console.log("hi"));

export const mute = new Composer();
mute.use(warnings);
mute.use(() => console.log("hi"));

export const pin = new Composer();
pin.use(warnings);
pin.use(() => console.log("hi"));
