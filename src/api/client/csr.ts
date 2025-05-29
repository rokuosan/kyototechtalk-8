import { HonoAppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

export const apiClient = hc<HonoAppType>("/");
