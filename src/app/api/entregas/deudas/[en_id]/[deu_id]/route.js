import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const sql = `
    SELECT entregas.en_id, deudas.*, entrega_deuda.en_deu_id, entrega_deuda.en_deu_monto
    FROM entrega_deuda
    OIN entregas ON entrega_deuda.en_id = entregas.en_id 
    JOIN deudas ON entrega_deuda.deu_id = deudas.deu_id;
    WHERE entrega_deuda.en_id = ? AND entrega_deuda.deu_id = ?;`;
  console.log([params.en_id, params.deu_id]);
  try {
    const result = await connection.query(sql, [params.en_id, params.deu_id]);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    console.log(data);
    const result = await connection.query(
      "UPDATE entrega_deuda SET ? WHERE en_id = ? AND deu_id = ?",
      [data, params.en_id, params.deu_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Deuda no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await connection.query(`
      SELECT entregas.en_id, deudas.*, entrega_deuda.en_deu_id, entrega_deuda.en_deu_monto
      FROM entrega_deuda
      OIN entregas ON entrega_deuda.en_id = entregas.en_id 
      JOIN deudas ON entrega_deuda.deu_id = deudas.deu_id;
      WHERE entrega_deuda.en_id = ? AND entrega_deuda.deu_id = ?;`,
      [params.en_id, params.deu_id]
    );
    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function DELETE(request, { params }) {
  try {
    const result = await connection.query(
      "DELETE FROM entrega_deuda WHERE en_id = ? AND deu_id = ?",
      [params.en_id, params.deu_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Deuda no encontrado" },
        { status: 404 }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
