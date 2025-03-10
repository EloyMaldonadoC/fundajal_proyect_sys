import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const { en_id } = await params;
    const sql = `SELECT entrega_paquete.*, producto_paquete.*, productos.* 
      FROM entrega_paquete
      JOIN producto_paquete ON entrega_paquete.pa_id = producto_paquete.pa_id 
      JOIN productos ON producto_paquete.produc_id = productos.produc_id
      WHERE entrega_paquete.en_id = ?
      AND entrega_paquete.en_pa_estado = "en entrega";`;
    const result = await connection.query(sql, [en_id]);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
