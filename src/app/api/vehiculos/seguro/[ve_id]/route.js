import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const result = await connection.query(
      "SELECT * FROM seguro WHERE ve_id = ?",
      [params.ve_id]
    );

    if (result.length == 0) {
      return NextResponse.json(
        { message: "Seguro no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    console.log(data);
    const result = await connection.query(
      "UPDATE seguro SET ? WHERE ve_id = ?",
      [data, params.ve_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Seguro no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await connection.query(
      "SELECT * FROM vehiculos WHERE ve_id = ?",
      [params.ve_id]
    );
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}

export async function DELETE(request, { params }) {
  try {
    const result = await connection.query(
      "DELETE FROM seguro WHERE ve_id = ?",
      [params.ve_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Seguro no encontrado" },
        { status: 404 }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}
