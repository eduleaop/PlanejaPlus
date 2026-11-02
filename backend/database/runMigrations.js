import { pool } from './connection.js';
import { runMigrations } from './migrationRunner.js';

try {
  await runMigrations();
} catch (error) {
  console.error('Falha ao executar migrations:', error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
