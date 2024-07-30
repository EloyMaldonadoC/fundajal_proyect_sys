import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request) {
  try {
    const result = await connection.query("SELECT * FROM servicios");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { ve_id, ser_desc, ser_costo, ser_estado } = request.json();
    const query = `INSERT INTO servicios (ve_id, ser_desc, ser_costo, ser_estado) VALUES (?, ?, ?, ?)`;
    const result = await connection.query(query, [ve_id, ser_desc, ser_costo, ser_estado]);
    console.log(result);
    return NextResponse.json({
      ve_id,
      ser_desc,
      ser_costo,
      ser_estado
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
