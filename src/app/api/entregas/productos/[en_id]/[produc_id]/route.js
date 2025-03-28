import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const sql = `
    SELECT entregas.en_id, productos.*, entrega_producto.en_produc_estado, entrega_producto.en_produc_oferta, entrega_producto.en_produc_cantidad
    FROM entrega_producto
    JOIN entregas ON entrega_producto.en_id = entregas.en_id 
    JOIN productos ON entrega_producto.produc_id = productos.produc_id
    WHERE entrega_producto.en_id = ? AND entrega_producto.produc_id = ?`;
  console.log([params.en_id, params.produc_id]);
  try {
    const result = await connection.query(sql, [params.en_id, params.produc_id]);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    console.log(data);
    const result = await connection.query(
      "UPDATE entrega_producto SET ? WHERE en_id = ? AND produc_id = ?",
      [data, params.en_id, params.produc_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await connection.query(
      `SELECT entregas.en_id, productos.*, entrega_producto.en_produc_estado, entrega_producto.en_produc_oferta, entrega_producto.en_produc_cantidad
        FROM entrega_producto
        JOIN entregas ON entrega_producto.en_id = entregas.en_id 
        JOIN productos ON entrega_producto.produc_id = productos.produc_id
        WHERE entrega_producto.en_id = ? AND entrega_producto.produc_id = ?`,
      [params.en_id, params.produc_id]
    );
    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
export async function DELETE(request, { params }) {
  try {
    const result = await connection.query(
      "DELETE FROM entrega_producto WHERE en_id = ? AND produc_id = ?",
      [params.en_id, params.produc_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
