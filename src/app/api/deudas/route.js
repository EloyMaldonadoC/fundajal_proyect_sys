import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET() {
  try {
    const result = await connection.query("SELECT * FROM deudas");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { cli_id, deu_monto, deu_abono, deu_estado } = await request.json();
    const query = `INSERT INTO deudas (cli_id, deu_monto, deu_abono, deu_estado) VALUES (?, ?, ?, ?)`;
    const result = connection.query(query, [
      cli_id,
      deu_monto,
      deu_abono,
      deu_estado,
    ]);
    console.log(result);
    return NextResponse.json({ cli_id, deu_monto, deu_abono, deu_estado });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
