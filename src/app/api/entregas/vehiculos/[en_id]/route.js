import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const sql = `
    SELECT entrega_vehiculo.* , vehiculos.ve_modelo, vehiculos.ve_marca, vehiculos.ve_imagen, vehiculos.ve_capacidad
    FROM entrega_vehiculo
    JOIN entregas ON entrega_vehiculo.en_id = entregas.en_id 
    JOIN vehiculos ON entrega_vehiculo.ve_id = vehiculos.ve_id
    WHERE entrega_vehiculo.en_id = ?`;
  try {
    const result = await connection.query(sql, [params.en_id]);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const result = await connection.query(
      "DELETE FROM entrega_vehiculo WHERE en_id = ?",
      [params.en_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Vehiculos no encontrados" },
        { status: 404 }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
