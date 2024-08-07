import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const sql = `
    SELECT producto_paquete.*, productos.produc_nombre, productos.produc_precio_venta, productos.produc_existencias
    FROM producto_paquete
    JOIN productos ON producto_paquete.produc_id = productos.produc_id 
    JOIN paquetes ON producto_paquete.pa_id = paquetes.pa_id
    WHERE producto_paquete.pa_id = ? AND producto_paquete.produc_id = ?;`;
  console.log([params.pa_id, params.produc_id]);
  try {
    const result = await connection.query(sql, [params.pa_id, params.produc_id]);
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
      "UPDATE producto_paquete SET ? WHERE pa_id = ? AND produc_id = ?",
      [data, params.pa_id, params.produc_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await connection.query(`
      SELECT producto_paquete.*, productos.produc_nombre, productos.produc_precio_venta, productos.produc_existencias
      FROM producto_paquete
      JOIN productos ON producto_paquete.produc_id = productos.produc_id 
      JOIN paquetes ON producto_paquete.pa_id = paquetes.pa_id
      WHERE producto_paquete.pa_id = ? AND producto_paquete.produc_id = ?;`,
      [params.pa_id, params.produc_id]
    );
    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function DELETE(request, { params }) {
  try {
    const result = await connection.query(
      "DELETE FROM producto_paquete WHERE pa_id = ? AND produc_id = ?",
      [params.pa_id, params.produc_id]
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
  }
}
