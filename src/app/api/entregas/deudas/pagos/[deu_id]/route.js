import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const { deu_id } = await params;
    const result = await connection.query(
      "SELECT * FROM pagos WHERE deu_id = ? ORDER BY pag_fecha_transac DESC;",
      [deu_id]
    );
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
