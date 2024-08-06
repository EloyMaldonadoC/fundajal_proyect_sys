import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request) {
  const sql = `
        SELECT entrega_vehiculo.* , vehiculos.ve_modelo, vehiculos.ve_marca, vehiculos.ve_imagen, vehiculos.ve_capacidad
        FROM entrega_vehiculo
        JOIN entregas ON entrega_vehiculo.en_id = entregas.en_id 
        JOIN vehiculos ON entrega_vehiculo.ve_id = vehiculos.ve_id`;
  try {
    const result = await connection.query(sql);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { en_id, ve_id } = await request.json();
    const sql = `INSERT INTO entrega_vehiculo (en_id, ve_id) VALUES (?, ?)`;
    const result = await connection.query(sql, [en_id, ve_id]);
    console.log(result);
    return NextResponse.json({ en_id, ve_id });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
