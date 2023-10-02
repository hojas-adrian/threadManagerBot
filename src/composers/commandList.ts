import { NextFunction } from "../../deps.ts";
import { MyContext } from "../helpers/context.ts";

export default (ctx: MyContext, next: NextFunction) => {
  ctx.api.setMyCommands(
    [
      {
        command: "session",
        description: "ver valor de la session por consola",
      },
      {
        command: "channel",
        description: "añadir este tema como canal",
      },
    ],
  );
  next();
};
