import { env } from '../config/env.js';
import { pool } from './connection.js';
import { migrations } from './migrations/index.js';

const migrationLockName = `planeja_plus_migrations_${env.database.name}`;

export async function runMigrations() {
  const connection = await pool.getConnection();
  let lockAcquired = false;

  try {
    const [lockRows] = await connection.query('SELECT GET_LOCK(?, 30) AS acquired', [
      migrationLockName,
    ]);

    if (Number(lockRows[0]?.acquired) !== 1) {
      throw new Error('Não foi possível obter o bloqueio para executar as migrations.');
    }

    lockAcquired = true;
    await connection.query(
      `CREATE TABLE IF NOT EXISTS schema_migrations (
        version VARCHAR(100) NOT NULL PRIMARY KEY,
        applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    );

    const [appliedRows] = await connection.query('SELECT version FROM schema_migrations');
    const appliedVersions = new Set(appliedRows.map((row) => row.version));

    for (const migration of migrations) {
      if (appliedVersions.has(migration.version)) {
        continue;
      }

      console.log(`Aplicando migration ${migration.version}...`);
      await migration.up(connection);
      await connection.execute('INSERT INTO schema_migrations (version) VALUES (?)', [
        migration.version,
      ]);
    }

    console.log('Migrations atualizadas.');
  } finally {
    try {
      if (lockAcquired) {
        await connection.query('SELECT RELEASE_LOCK(?)', [migrationLockName]);
      }
    } finally {
      connection.release();
    }
  }
}
