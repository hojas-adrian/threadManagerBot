import { Context } from "../../deps.ts";

export interface SessionData {
  threads: { [key: number | string]: number[] };
  adminRol: boolean;
}

export function initial(): SessionData {
  return { adminRol: true, threads: {} };
}

export function getSessionKey(ctx: Context): string | undefined {
  // Dar a cada usuario su almacenamiento de una sesión personal por chat con el bot
  // (una sesión independiente para cada grupo y su chat privado)
  return ctx.from === undefined || ctx.chat === undefined
    ? undefined
    : `${ctx.from.id}/${ctx.chat.id}`;
}
