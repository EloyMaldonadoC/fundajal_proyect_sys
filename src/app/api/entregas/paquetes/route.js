import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request) {
  const sql = `SELECT entregas.en_id, paquetes.*, entrega_paquete.en_pa_estado, entrega_paquete.en_pa_cantidad
        FROM entrega_paquete
        JOIN entregas ON entrega_paquete.en_id = entregas.en_id 
        JOIN paquetes ON entrega_paquete.pa_id = paquetes.pa_id`;
  try {
    const result = await connection.query(sql)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
export async function POST(request) {
  try {
    const { en_id, pa_id, en_pa_estado, en_pa_cantidad } = await request.json();
    const sql = `INSERT INTO entrega_paquete (en_id, pa_id, en_pa_estado, en_pa_cantidad) VALUES (?, ?, ?, ?)`;
    const result = await connection.query(sql, [
      en_id,
      pa_id,
      en_pa_estado,
      en_pa_cantidad,
    ]);
    console.log(result);
    return NextResponse.json({ en_id, pa_id, en_pa_estado, en_pa_cantidad });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}