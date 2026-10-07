const fs = require("node:fs");
const path = require("node:path");
const Database = require("better-sqlite3");

function createDatabase(databaseFile = process.env.DATABASE_FILE || "./data/appointments.db") {
  const isInMemoryDatabase = databaseFile === ":memory:" || databaseFile.startsWith(":memory:");

  if (!isInMemoryDatabase) {
    const resolvedPath = path.resolve(process.cwd(), databaseFile);
    fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    const db = new Database(resolvedPath);
    db.exec(schema);
    return db;
  }

  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");
  const db = new Database(databaseFile);
  db.exec(schema);
  return db;
}

module.exports = {
  createDatabase,
};
