import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET() {
  try {
    const result = await connection.query("SELECT * FROM paquetes");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {pa_id, pa_nombre, pa_descripcion, pa_precio, pa_comision} = await request.json();
    const query = `INSERT INTO paquetes (pa_id, pa_nombre, pa_descripcion, pa_precio, pa_comision) VALUES (?, ?, ?, ?, ?)`
    const result = await connection.query(query, [pa_id, pa_nombre, pa_descripcion, pa_precio, pa_comision])
    console.log(result)
    return NextResponse.json({pa_id, pa_nombre, pa_descripcion, pa_precio, pa_comision})
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
