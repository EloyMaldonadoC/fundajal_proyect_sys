import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const result = await connection.query(
      "SELECT * FROM servicios WHERE ser_id = ?;",
      [params.ser_id]
    );

    if (result.length == 0) {
      return NextResponse.json(
        { message: "servicio no encontrado" },
        { status: 404 }
      );
    }
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
      "UPDATE servicios SET ? WHERE ser_id = ?",
      [data, params.ser_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "servicio no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await connection.query(
      "SELECT * FROM servicios WHERE ser_id = ?",
      [params.ser_id]
    );
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
