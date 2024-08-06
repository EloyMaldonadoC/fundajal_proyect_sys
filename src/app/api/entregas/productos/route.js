import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request) {
  const sql = `SELECT entregas.en_id, productos.*, entrega_producto.en_produc_estado, entrega_producto.en_produc_cantidad, entrega_producto.en_produc_oferta
        FROM entrega_producto
        JOIN entregas ON entrega_producto.en_id = entregas.en_id 
        JOIN productos ON entrega_producto.produc_id = productos.produc_id`;
  try {
    const result = await connection.query(sql);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {
      en_id,
      produc_id,
      en_produc_estado,
      en_produc_cantidad,
      en_produc_oferta,
    } = await request.json();
    const sql = `INSERT INTO entrega_producto (en_id, produc_id, en_produc_estado, en_produc_cantidad, en_produc_oferta) VALUES (?, ?, ?, ?, ?)`;
    const result = await connection.query(sql, [
      en_id,
      produc_id,
      en_produc_estado,
      en_produc_cantidad,
      en_produc_oferta,
    ]);
    console.log(result);
    return NextResponse.json({
      en_id,
      produc_id,
      en_produc_estado,
      en_produc_cantidad,
      en_produc_oferta,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
