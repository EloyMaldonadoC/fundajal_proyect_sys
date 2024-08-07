import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const sql = `
        SELECT entregas.en_id, deudas.*, entrega_deuda.en_deu_id, entrega_deuda.en_deu_monto
        FROM entrega_deuda
        JOIN entregas ON entrega_deuda.en_id = entregas.en_id 
        JOIN deudas ON entrega_deuda.deu_id = deudas.deu_id;
        WHERE entrega_deuda.en_id = ?`;
  try {
    const result = await connection.query(sql, [params.en_id])
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}