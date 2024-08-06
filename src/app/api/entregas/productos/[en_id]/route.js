import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const sql = `SELECT entregas.en_id, productos.*, entrega_producto.en_produc_estado, entrega_producto.en_produc_oferta, entrega_producto.en_produc_cantidad
    FROM entrega_producto
    JOIN entregas ON entrega_producto.en_id = entregas.en_id 
    JOIN productos ON entrega_producto.produc_id = productos.produc_id
    WHERE entrega_producto.en_id = ?`;
  try {
    const result = await connection.query(sql, [params.en_id])
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}