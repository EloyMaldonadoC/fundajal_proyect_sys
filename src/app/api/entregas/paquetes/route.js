import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request) {
  const sql = `SELECT * FROM entrega_paquete`;
  try {
    const result = await connection.query(sql)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
export async function POST(request) {
  try {
    const paquetes = await request.json();
    const query = `INSERT INTO entrega_paquete (en_id, pa_id, en_pa_estado, en_pa_cantidad, en_pa_precio, en_pa_desc) VALUES ?;`;
    const values = paquetes.map(paquete => [
      paquete.en_id,
      paquete.pa_id,
      paquete.en_pa_estado,
      paquete.en_pa_cantidad,
      paquete.en_pa_precio,
      paquete.en_pa_desc
  ])

    const result = await connection.query(query, [values]);
    console.log(result);
    return NextResponse.json("Paquetes agregados");
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
