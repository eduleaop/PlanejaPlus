import { pool } from './connection.js';
import { seedDefaultCategories } from './defaultCategories.js';
import { runMigrations } from './migrationRunner.js';

try {
  await runMigrations();

  const [users] = await pool.query('SELECT id FROM usuarios ORDER BY id');
  for (const user of users) {
    await seedDefaultCategories(pool, user.id);
  }

  console.log(`Seed concluído para ${users.length} usuário(s).`);
} catch (error) {
  console.error('Falha ao executar seed:', error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
