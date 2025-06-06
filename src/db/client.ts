import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export const getDrizzleDB = (db: D1Database) => {
  return drizzle(db, {
    schema,
    logger: false,
  });
};
