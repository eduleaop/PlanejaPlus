import { seedDefaultCategories } from '../defaultCategories.js';

export const version = '003-seed-default-categories';

export async function up(connection) {
  const [users] = await connection.query('SELECT id FROM usuarios ORDER BY id');

  for (const user of users) {
    await seedDefaultCategories(connection, user.id);
  }
}
