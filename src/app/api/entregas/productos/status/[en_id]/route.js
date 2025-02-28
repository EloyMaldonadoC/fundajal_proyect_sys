import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const sql = `SELECT entrega_estado_producto.*, productos.* 
            FROM entrega_estado_producto
            JOIN productos ON entrega_estado_producto.produc_id = productos.produc_id
            WHERE entrega_estado_producto.en_id = ?;`;
  try {
    const result = await connection.query(sql, [params.en_id]);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const result = await connection.query(
      "DELETE FROM entrega_estado_producto WHERE en_id = ?",
      [params.en_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Productos no encontrados" },
        { status: 404 }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
