import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const { cli_id } = await params;
    const result = await connection.query(
      "SELECT * FROM clientes WHERE cli_id = ?",
      [cli_id]
    );
    if (result.length == 0) {
      return NextResponse.json(
        { message: "Cliente no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}

export async function PUT(request, { params }) {
  try {
    const { cli_id } = await params;
    const data = await request.json();
    console.log(data);
    const result = await connection.query(
      "UPDATE clientes SET ? WHERE cli_id = ?",
      [data, cli_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Cliente no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await connection.query(
      "SELECT * FROM clientes WHERE cli_id = ?",
      [cli_id]
    );
    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}

export async function DELETE(request, { params }) {
  try {
    const { cli_id } = await params;
    const result = await connection.query(
      "DELETE FROM clientes WHERE cli_id = ?",
      [cli_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Cliente no encontrado" },
        { status: 404 }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
