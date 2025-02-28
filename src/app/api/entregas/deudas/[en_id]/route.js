import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const result = await connection.query(
      "SELECT * FROM deudas WHERE en_id = ?",
      [params.en_id]
    );
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await connection.query(
      "UPDATE deudas SET ? WHERE en_id = ?",
      [data, params.en_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Deuda no encontrado" },
        { status: 404 }
      );
    }
    const updatedProduct = await connection.query(
      "SELECT * FROM deudas WHERE en_id = ?",
      [params.deu_id]
    );
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
