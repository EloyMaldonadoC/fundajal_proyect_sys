import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const { produc_id } = await params;
    const result = await connection.query(
      "SELECT * FROM productos WHERE produc_id = ?",
      [produc_id]
    );

    if (result.length == 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
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

export async function DELETE(request, { params }) {
  try {
    const { produc_id } = await params;
    const result = await connection.query(
      "DELETE FROM productos WHERE produc_id = ?",
      [produc_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
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

export async function PUT(request, { params }) {
  try {
    const  { produc_id } = await params;
    const data = await request.json();
    console.log(request);
    const result = await connection.query(
      "UPDATE productos SET ? WHERE produc_id = ?",
      [data, produc_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await connection.query(
      "SELECT * FROM productos WHERE produc_id = ?",
      [produc_id]
    );
    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
