import { getDrizzleDB } from "@/db/client";
import { articles } from "@/db/schema";
import { Article } from "@/types";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Hono } from "hono";

type AppVariables = {
  db: ReturnType<typeof getDrizzleDB>;
};

type AppEnv = {
  Variables: AppVariables;
};

const app = new Hono<AppEnv>().basePath("/api")
  .use('*', (c, next) => {
    const ctx = getCloudflareContext();
    const db = getDrizzleDB(ctx.env.DB);
    c.set("db", db);
    return next()
  })
  .get("/", (c) => c.text("/"))
  .get("/hello", (c) => c.text("/hello"))
  .get("/hello/:name", (c) => c.text(`/hello/${c.req.param("name")}`))
  .get("/articles", async (c) => {
    const db = c.get("db");
    const result = await db.query.articles.findMany();
    const data = result.map((it) => ({
      id: it.id,
      title: it.title,
      content: it.content,
      created_at: `${it.createdAt}`,
    } as Article));
    return c.json(data);
  })
  .post("/articles", async (c) => {
    const body = await c.req.json();

    const db = c.var.db;
    const result = await db.insert(articles).values({
      title: body.title as string,
      content: body.content as string,
    }).returning();

    return c.json(result[0]);
  });

export const GET = app.fetch;
export const POST = app.fetch;

export type HonoAppType = typeof app;
