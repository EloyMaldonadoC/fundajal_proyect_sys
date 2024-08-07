import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request) {
  const sql = `
    SELECT entregas.en_id, deudas.*, entrega_deuda.en_deu_id, entrega_deuda.en_deu_monto
    FROM entrega_deuda
    JOIN entregas ON entrega_deuda.en_id = entregas.en_id 
    JOIN deudas ON entrega_deuda.deu_id = deudas.deu_id;`;
  try {
    const result = await connection.query(sql);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function POST(request) {
  try {
    const { en_id, deu_id, en_deu_monto } = await request.json();
    const sql = `INSERT INTO entrega_deuda (en_id, deu_id, en_deu_monto) VALUES (?, ?, ?)`;
    const result = await connection.query(sql, [en_id, deu_id, en_deu_monto]);
    console.log(result);
    return NextResponse.json({ en_id, deu_id, en_deu_monto });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
