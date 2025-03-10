import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const { produc_id } = await params;
    const sql = 
      `SELECT productos.*, proveedores.*
      FROM proveedir_producto
      JOIN proveedores ON proveedir_producto.prov_id = proveedores.prov_id 
      JOIN productos ON proveedir_producto.produc_id = productos.produc_id
      WHERE proveedir_producto.produc_id = ?;`;

    try {
      const result = await connection.query(sql, [produc_id]);
      return NextResponse.json(result);
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } finally {
      connection.quit();
    }
  }