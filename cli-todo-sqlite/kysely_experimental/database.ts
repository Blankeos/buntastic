/**
 * DOES NOT WORK.
 */
import { Database } from "./types.ts"; // This is the database interface
import {
  Dialect,
  Kysely,
  PostgresQueryCompiler,
  SqliteAdapter,
  SqliteDriver,
  SqliteIntrospector,
} from "kysely";
import { Database as SQLite } from "bun:sqlite";

const dialect: Dialect = {
  createAdapter() {
    return new SqliteAdapter();
  },
  createDriver() {
    return new SqliteDriver({
      database: new SQLite("sqlite3.db") as any,
    });
  },
  createIntrospector(db: Kysely<unknown>) {
    return new SqliteIntrospector(db);
  },
  createQueryCompiler() {
    return new PostgresQueryCompiler();
  },
};

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your datbase structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
});
