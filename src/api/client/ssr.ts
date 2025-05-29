'use server'

import { hc } from "hono/client";
import { HonoAppType } from "@/app/api/[[...route]]/route";
import { headers } from "next/headers";

export const ssrClient = async () => {
  const headersList = await headers()
  const host = headersList.get('host')?.replace(/\/$/, '') ?? 'localhost:3000'

  const scheme = host?.includes('localhost') ? 'http' : 'https'

  return hc<HonoAppType>(`${scheme}://${host}/`)
}
