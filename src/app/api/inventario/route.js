import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET() {
  const sql = `SELECT proveedir_producto.*
        FROM proveedir_producto
        JOIN productos ON proveedir_producto.produc_id = productos.produc_id
        JOIN proveedores ON proveedir_producto.prov_id = proveedores.prov_id;`;

  try {
    const result = await connection.query(sql);
    return NextResponse.json(result);
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

export async function POST(request) {
  try {
    const {
      prov_id,
      produc_id,
    } = await request.json();
    const query = `INSERT INTO proveedir_producto (prov_id, produc_id) VALUES (?, ?)`;
    const result = await connection.query(query, [
      prov_id,
      produc_id,
    ]);
    console.log(result);
    return NextResponse.json({
      prov_id,
      produc_id,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}