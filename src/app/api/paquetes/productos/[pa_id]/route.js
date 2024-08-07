import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const sql = `
        SELECT producto_paquete.*, productos.produc_nombre, productos.produc_precio_venta, productos.produc_existencias
        FROM producto_paquete
        JOIN productos ON producto_paquete.produc_id = productos.produc_id 
        JOIN paquetes ON producto_paquete.pa_id = paquetes.pa_id
        WHERE producto_paquete.pa_id = ?;`;
  try {
    const result = await connection.query(sql, [params.pa_id])
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}