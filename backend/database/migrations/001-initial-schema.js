import { readFile } from 'node:fs/promises';

export const version = '001-initial-schema';

export async function up(connection) {
  const schema = await readFile(new URL('../schema.sql', import.meta.url), 'utf8');
  const statements = schema
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await connection.query(statement);
  }
}
