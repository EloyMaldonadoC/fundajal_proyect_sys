import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET() {
  try {
    const result = await connection.query(`
      SELECT entregas.*, clientes.*, empleados.*
      FROM entregas
      JOIN clientes ON entregas.cli_id = clientes.cli_id
      JOIN empleados ON entregas.emp_id = empleados.emp_id
      ORDER BY en_dia_pedido DESC;
    `);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}

export async function POST(request) {
  try {
    const {
      en_id,
      emp_id,
      cli_id,
      en_dia_pedido,
      en_dia_entrega,
      en_hora_salida,
      en_hora_entrega,
      en_incremento_producto,
      en_incremento_paquete,
      en_estado
    } = await request.json();
    const query = `INSERT INTO entregas (en_id, emp_id, cli_id, en_dia_pedido, en_dia_entrega, en_hora_salida, en_hora_entrega, en_incremento_producto, en_incremento_paquete, en_estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await connection.query(query, [
      en_id,
      emp_id,
      cli_id,
      en_dia_pedido,
      en_dia_entrega,
      en_hora_salida,
      en_hora_entrega,
      en_incremento_producto,
      en_incremento_paquete,
      en_estado
    ]);
    console.log(result);
    return NextResponse.json({
      en_id,
      emp_id,
      cli_id,
      en_dia_pedido,
      en_dia_entrega,
      en_hora_salida,
      en_hora_entrega,
      en_incremento_producto,
      en_incremento_paquete,
      en_estado
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}
