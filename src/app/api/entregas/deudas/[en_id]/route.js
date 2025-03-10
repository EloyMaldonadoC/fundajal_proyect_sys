import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const { en_id } = await params;
    const result = await connection.query(
      "SELECT * FROM deudas WHERE en_id = ?",
      [en_id]
    );
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}

export async function PUT(request, { params }) {
  try {
    const { en_id } = await params;
    const data = await request.json();
    const result = await connection.query(
      "UPDATE deudas SET ? WHERE en_id = ?",
      [data, en_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Deuda no encontrado" },
        { status: 404 }
      );
    }
    const updatedProduct = await connection.query(
      "SELECT * FROM deudas WHERE en_id = ?",
      [deu_id]
    );
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
