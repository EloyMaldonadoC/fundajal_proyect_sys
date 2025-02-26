import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || 1;
    const limit = url.searchParams.get("limit") || 10;

    const offset = (page - 1) * limit;

    const result = await connection.query(`
      SELECT entregas.*, clientes.*, empleados.*
      FROM entregas
      JOIN clientes ON entregas.cli_id = clientes.cli_id
      JOIN empleados ON entregas.emp_id = empleados.emp_id
      ORDER BY en_dia_pedido DESC
      LIMIT ${limit} OFFSET ${offset};
    `);
    const data = {
      entregas: result,
      currentPage: page,
    };
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}
