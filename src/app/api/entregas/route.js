import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET() {
  try {
    const result = await connection.query("SELECT * FROM entregas");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {
      emp_id,
      cli_id,
      en_dia_pedido,
      en_dia_entrega,
      en_hora_salida,
      en_hora_entrega,
      en_incremento,
    } = await request.json();
    const query = `INSERT INTO entregas (emp_id, cli_id, en_dia_pedido, en_dia_entrega, en_hora_salida, en_hora_entrega, en_incremento) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const result = connection.query(query, [
      emp_id,
      cli_id,
      en_dia_pedido,
      en_dia_entrega,
      en_hora_salida,
      en_hora_entrega,
      en_incremento,
    ]);
    console.log(result);
    return NextResponse.json({
      emp_id,
      cli_id,
      en_dia_pedido,
      en_dia_entrega,
      en_hora_salida,
      en_hora_entrega,
      en_incremento,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
