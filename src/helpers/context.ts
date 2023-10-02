import { Context, SessionFlavor } from "../../deps.ts";
import { SessionData } from "./session.ts";

// Tipo de flavor context para incluir las sesiones.
export type MyContext =
  & Context
  & SessionFlavor<SessionData>;
