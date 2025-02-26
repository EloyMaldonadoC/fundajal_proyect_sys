import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const sql = `SELECT entregas.en_id, paquetes.*, entrega_paquete.en_pa_estado, entrega_paquete.en_pa_cantidad
    FROM entrega_paquete
    JOIN entregas ON entrega_paquete.en_id = entregas.en_id 
    JOIN paquetes ON entrega_paquete.pa_id = paquetes.pa_id
    WHERE entrega_paquete.en_id = ? AND entrega_paquete.pa_id = ?;`;
  console.log([params.en_id, params.pa_id]);
  try {
    const result = await connection.query(sql, [params.en_id, params.pa_id]);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    console.log(data);
    const result = await connection.query(
      "UPDATE entrega_paquete SET ? WHERE en_id = ? AND pa_id = ?",
      [data, params.en_id, params.pa_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Paquete no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await connection.query(
      `SELECT entregas.en_id, paquetes.*, entrega_paquete.en_pa_estado, entrega_paquete.en_pa_cantidad
      FROM entrega_paquete
      JOIN entregas ON entrega_paquete.en_id = entregas.en_id 
      JOIN paquetes ON entrega_paquete.pa_id = paquetes.pa_id
      WHERE entrega_paquete.en_id = ? AND entrega_paquete.pa_id = ?;`,
      [params.en_id, params.pa_id]
    );
    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}
export async function DELETE(request, { params }) {
  try {
    const result = await connection.query(
      "DELETE FROM entrega_paquete WHERE en_id = ? AND pa_id = ?",
      [params.en_id, params.pa_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Paquete no encontrado" },
        { status: 404 }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}
