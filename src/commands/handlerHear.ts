import { MyContext } from "../helpers/context.ts";

const matchOne = (ctx: MyContext, chats: string) => {
  ctx;
  chats;
  console.log("manejar el hear");
  return "";
};

export default (ctx: MyContext) => {
  const chats = ctx.match;

  (typeof chats == "string" && chats.length > 1)
    ? matchOne(ctx, chats)
    : console.log("no puedo manejar multiples argumentos");
};
