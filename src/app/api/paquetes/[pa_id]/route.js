import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const { pa_id } = await params;
    const result = await connection.query(
      "SELECT * FROM paquetes WHERE pa_id = ?",
      [pa_id]
    );
    if (result.length == 0) {
      return NextResponse.json(
        { message: "Paquete no encontrado" },
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
    const { pa_id } = await params;
    const data = await request.json();
    console.log(data);
    const result = await connection.query(
      "UPDATE paquetes SET ? WHERE pa_id = ?",
      [data, pa_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Paquete no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await connection.query(
      "SELECT * FROM paquetes WHERE pa_id = ?",
      [pa_id]
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
    const { pa_id } = await params;
    const result = await connection.query(
      "DELETE FROM paquetes WHERE pa_id = ?",
      [pa_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Paquete no encontrado" },
        { status: 404 }
      );
    }
    const resultDelete = await connection.query(
      "DELETE FROM producto_paquete WHERE pa_id = ?",
      [pa_id]
    )
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
