import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function POST(request) {
  try {
    const productos = await request.json();

    const query = `INSERT INTO producto_paquete (pa_id, produc_id, produc_pa_cantidad) VALUES ?`;
    const values = productos.map((productos) => [
      productos.pa_id,
      productos.produc_id,
      productos.produc_pa_cantidad,
    ]);

    const result = await connection.query(query, [values]);

    console.log(result);
    return NextResponse.json("Productos agregados");
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
