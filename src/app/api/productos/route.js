import { connection } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await connection.query("SELECT * from productos ORDER BY produc_nombre ASC");
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
      produc_id,
      produc_nombre,
      produc_existencias,
      produc_precio_venta,
      produc_parti_fun,
      produc_parti_enlace
    } = await request.json();

    const sql = `INSERT INTO productos (produc_id, produc_nombre, produc_existencias, produc_precio_venta, produc_parti_fun, produc_parti_enlace) VALUES (?, ?, ?, ?, ?, ?)`;

    const result = await connection.query(sql, [
      produc_id,
      produc_nombre,
      produc_existencias,
      produc_precio_venta,
      produc_parti_fun,
      produc_parti_enlace
    ]);
    console.log(result);
    return NextResponse.json({
      produc_id,
      produc_nombre,
      produc_existencias,
      produc_precio_venta,
      produc_parti_fun,
      produc_parti_enlace
    });
  } catch (error) {
    console.log(error);
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