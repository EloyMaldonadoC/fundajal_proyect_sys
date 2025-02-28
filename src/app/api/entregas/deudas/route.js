import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET() {
  try {
    const result = await connection.query("SELECT * FROM deudas");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}

export async function POST(request) {
  try {
    const { en_id, deu_abono, deu_estado, deu_deuda, deu_deuda_pendiente, deu_comision_funjal, deu_comision_enlace } = await request.json();
    const query = `INSERT INTO deudas (en_id, deu_abono, deu_estado, deu_deuda, deu_deuda_pendiente, deu_comision_funjal, deu_comision_enlace) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const result = await connection.query(query, [en_id, deu_abono, deu_estado, deu_deuda, deu_deuda_pendiente, deu_comision_funjal, deu_comision_enlace]);
    console.log(result);
    return NextResponse.json({ en_id, deu_abono, deu_estado, deu_deuda, deu_deuda_pendiente, deu_comision_funjal, deu_comision_enlace }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
