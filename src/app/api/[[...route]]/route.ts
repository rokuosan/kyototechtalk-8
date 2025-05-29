import { Hono } from "hono";

const app = new Hono().basePath("/api")
    .get("/", (c) => c.text("/"))
    .get("/hello", (c) => c.text("/hello"))
    .get("/hello/:name", (c) => c.text(`/hello/${c.req.param("name")}`));

export const GET = app.fetch;
export const POST = app.fetch;

export type HonoAppType = typeof app;
