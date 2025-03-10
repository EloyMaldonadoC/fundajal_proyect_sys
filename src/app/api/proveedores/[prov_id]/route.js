import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const { prov_id } = await params;
    const result = await connection.query(
      "SELECT * FROM proveedores WHERE prov_id = ?",
      [prov_id]
    );

    if (result.length == 0) {
      return NextResponse.json(
        { message: "Proveedor no encontrado" },
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
    const { prov_id } = await params;
    const data = await request.json();
    console.log(data);
    const result = await connection.query(
      "UPDATE proveedores SET ? WHERE prov_id = ?",
      [data, prov_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Proveedor no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await connection.query(
      "SELECT * FROM proveedores WHERE prov_id = ?",
      [prov_id]
    );
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}

export async function DELETE(request, { params }) {
  try {
    const { prov_id } = await params;
    const result = await connection.query(
      "DELETE FROM proveedores WHERE prov_id = ?",
      [prov_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Proveedor no encontrado" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
