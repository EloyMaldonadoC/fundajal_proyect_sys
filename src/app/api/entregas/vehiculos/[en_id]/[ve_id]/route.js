import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const sql = `
    SELECT entrega_vehiculo.* , vehiculos.ve_modelo, vehiculos.ve_marca, vehiculos.ve_imagen, vehiculos.ve_capacidad
    FROM entrega_vehiculo
    JOIN entregas ON entrega_vehiculo.en_id = entregas.en_id 
    JOIN vehiculos ON entrega_vehiculo.ve_id = vehiculos.ve_id
    WHERE entrega_vehiculo.en_id = ? AND entrega_vehiculo.ve_id = ?`;
  try {
    const { en_id, ve_id } = await params;
    const result = await connection.query(sql, [en_id, ve_id]);
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
      "UPDATE entrega_vehiculo SET ? WHERE en_id = ? AND ve_id = ?",
      [data, params.en_id, params.ve_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Vehiculo no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await connection.query(
      `SELECT entrega_vehiculo.* , vehiculos.ve_modelo, vehiculos.ve_marca, vehiculos.ve_imagen, vehiculos.ve_capacidad
        FROM entrega_vehiculo
        JOIN entregas ON entrega_vehiculo.en_id = entregas.en_id 
        JOIN vehiculos ON entrega_vehiculo.ve_id = vehiculos.ve_id
        WHERE entrega_vehiculo.en_id = ? AND entrega_vehiculo.ve_id = ?`,
      [params.en_id, params.ve_id]
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
    const result = await connection.query(
      "DELETE FROM entrega_vehiculo WHERE en_id = ? AND ve_id = ?",
      [params.en_id, params.ve_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Vehiculo no encontrado" },
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
