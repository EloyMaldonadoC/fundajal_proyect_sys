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
    const {pa_nombre, pa_precio} = await request.json();
    const query = `INSERT INTO paquetes (pa_nombre, pa_precio) VALUES (?, ?)`
    const result = connection.query(query, [pa_nombre, pa_precio])
    console.log(result)
    return NextResponse.json({pa_nombre, pa_precio})
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
