export const version = '002-user-access-columns';

export async function up(connection) {
  const [columns] = await connection.query(
    `SELECT COLUMN_NAME
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'usuarios'`,
  );
  const existingColumns = new Set(columns.map((column) => column.COLUMN_NAME));

  if (!existingColumns.has('perfil')) {
    await connection.execute(
      "ALTER TABLE usuarios ADD COLUMN perfil ENUM('usuario', 'admin') NOT NULL DEFAULT 'usuario'",
    );
  }

  if (!existingColumns.has('ativo')) {
    await connection.execute('ALTER TABLE usuarios ADD COLUMN ativo BOOLEAN NOT NULL DEFAULT TRUE');
  }

  await connection.execute(
    "UPDATE usuarios SET perfil = COALESCE(perfil, 'usuario'), ativo = COALESCE(ativo, TRUE) WHERE perfil IS NULL OR ativo IS NULL",
  );
}
