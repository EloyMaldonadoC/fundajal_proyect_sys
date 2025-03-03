import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const { produc_id } = params;
    const [historial, proveedores] = await connection.query(`
      SELECT productos.produc_nombre, historial.*
      FROM historial
      JOIN productos ON historial.produc_id = productos.produc_id
      WHERE historial.produc_id = ?
      ORDER BY historial.hist_dia DESC, historial.hist_hora DESC;

      SELECT proveedores.*
      FROM proveedir_producto 
      JOIN proveedores ON proveedir_producto.prov_id = proveedores.prov_id
      WHERE proveedir_producto.produc_id = ?;
    `, [produc_id, produc_id]);
    const data = {
      produc_id: produc_id,
      historial: historial,
      proveedores: proveedores,
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  } finally {
    connection.quit();
  }
}
