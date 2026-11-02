export const defaultCategories = [
  { nome: 'Salário', tipo: 'receita' },
  { nome: 'Investimentos', tipo: 'receita' },
  { nome: 'Outras receitas', tipo: 'receita' },
  { nome: 'Moradia', tipo: 'despesa' },
  { nome: 'Alimentação', tipo: 'despesa' },
  { nome: 'Transporte', tipo: 'despesa' },
  { nome: 'Saúde', tipo: 'despesa' },
  { nome: 'Lazer', tipo: 'despesa' },
  { nome: 'Outras despesas', tipo: 'despesa' },
];

export async function seedDefaultCategories(connection, usuarioId) {
  for (const categoria of defaultCategories) {
    const [existing] = await connection.execute(
      'SELECT id FROM categorias WHERE usuario_id = ? AND nome = ? AND tipo = ? LIMIT 1',
      [usuarioId, categoria.nome, categoria.tipo],
    );

    if (existing.length === 0) {
      await connection.execute(
        'INSERT INTO categorias (usuario_id, nome, tipo) VALUES (?, ?, ?)',
        [usuarioId, categoria.nome, categoria.tipo],
      );
    }
  }
}
