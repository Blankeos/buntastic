/**
 * DOES NOT WORK.
 */
import * as path from "node:path";
import { promises as fs } from "node:fs";
import { Database } from "../src/types"; // This is the database interface
import { Kysely, Migrator, SqliteDialect, FileMigrationProvider } from "kysely";
// import { db } from "../src/database";
import { BunSqliteDialect } from "kysely-bun-sqlite";
import { Database as SQLite } from "bun:sqlite";

async function migrateToLatest() {
  const databasePath = path.join(import.meta.dir, "..", "sqlite3.db");

  const db = new Kysely<Database>({
    dialect: new BunSqliteDialect({
      database: new SQLite(databasePath),
    }) as any,
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(
        import.meta.dir,
        "..",
        "database",
        "migrations"
      ),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
