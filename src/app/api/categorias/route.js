import db from '../../lib/db';

export async function GET(req, res) {
  const queryCategorias = "SELECT * FROM categories";
  
  try {
    const [result] = await db.query(queryCategorias);  // Utilizando o promise do mysql2 diretamente
    res.json(result);
  } catch (err) {
    // Caso ocorra um erro, captura e envia um erro 500
    console.error('Erro ao buscar categorias:', err);
    res.status(500).send({ error: "Erro interno ao buscar categorias" });
  }
}
