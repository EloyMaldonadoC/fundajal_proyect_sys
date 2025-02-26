import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request) {
  const sql = `SELECT entrega_estado_producto.*, productos.* 
FROM entrega_estado_producto
JOIN productos ON entrega_estado_producto.produc_id = productos.produc_id;`;
  try {
    const result = await connection.query(sql);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}
export async function POST(request) {
  try {
    const productos = await request.json();
    const query = `INSERT INTO entrega_estado_producto (en_id, produc_id, en_es_produc_estado, en_es_produc_cant) VALUES ?`;
    const values = productos.map(producto => [
      producto.en_id,
      producto.produc_id,
      producto.en_es_produc_estado,
      producto.en_es_produc_cant,
    ])
    const result = await connection.query(query, [values]);
    
    console.log(result);
    return NextResponse.json("Productos agregados");
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}
