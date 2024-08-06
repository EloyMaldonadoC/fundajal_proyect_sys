import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const sql = `SELECT entregas.en_id, paquetes.*, entrega_paquete.en_pa_estado, entrega_paquete.en_pa_cantidad
        FROM entrega_paquete
        JOIN entregas ON entrega_paquete.en_id = entregas.en_id 
        JOIN paquetes ON entrega_paquete.pa_id = paquetes.pa_id
        WHERE entrega_paquete.en_id = ?`;
  try {
    const result = await connection.query(sql, [params.en_id])
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}