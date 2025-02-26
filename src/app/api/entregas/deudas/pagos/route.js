import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request) {
  try {
    const sql = `SELECT pagos.* FROM pagos`;
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
    const { deu_id, pag_monto, pag_desc, pag_metodo, pag_fecha_transac } = await request.json();
    console.log(deu_id, pag_monto, pag_desc, pag_metodo, pag_fecha_transac)
    const query = `INSERT INTO pagos (deu_id, pag_monto, pag_desc, pag_metodo, pag_fecha_transac) VALUES (?, ?, ?, ?, ?)`;
    const result = await connection.query(query, [
      deu_id, 
      pag_monto, 
      pag_desc,
      pag_metodo,
      pag_fecha_transac 
    ]);
    console.log("resultado", result);
    return NextResponse.json({ deu_id, pag_monto, pag_desc, pag_metodo, pag_desc, pag_fecha_transac });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}
