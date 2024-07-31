import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const result = await connection.query(
      "SELECT * FROM entregas WHERE en_id = ?",
      [params.en_id]
    );
    if (result.length == 0) {
      return NextResponse.json(
        { message: "Entrega no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    console.log(data);
    const result = await connection.query(
      "UPDATE entregas SET ? WHERE en_id = ?",
      [data, params.en_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Entrega no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await connection.query(
      "SELECT * FROM entregas WHERE en_id = ?",
      [params.en_id]
    );
    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const result = await connection.query(
      "DELETE FROM entregas WHERE en_id = ?",
      [params.en_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Entrega no encontrado" },
        { status: 404 }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
