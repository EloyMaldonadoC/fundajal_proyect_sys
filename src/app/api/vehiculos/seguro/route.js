import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request) {
  try {
    const result = await connection.query("SELECT * FROM seguro");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}

export async function POST(request) {
  try {
    const { ve_id, segu_nombre, segu_monto_pago, segu_vigencia } = await request.json();
    const query = `INSERT INTO seguro (ve_id, segu_nombre, segu_monto_pago, segu_vigencia) VALUES (?, ?, ?, ?)`;
    const result = await connection.query(query, [
      ve_id,
      segu_nombre,
      segu_monto_pago,
      segu_vigencia,
    ]);
    console.log(result);
    return NextResponse.json({
      ve_id,
      segu_nombre,
      segu_monto_pago,
      segu_vigencia,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}
