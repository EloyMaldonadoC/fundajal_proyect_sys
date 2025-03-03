import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET() {
  try {
    const result = await connection.query("SELECT * FROM clientes");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {cli_id, cli_nombre, cli_municipio, cli_estado, cli_numero_contac } =
      await request.json();
    const query = `INSERT INTO clientes (cli_id, cli_nombre, cli_municipio, cli_estado, cli_numero_contac) VALUES (?, ?, ?, ?, ?)`;
    const result = await connection.query(query, [
      cli_id,
      cli_nombre,
      cli_municipio,
      cli_estado,
      cli_numero_contac
    ]);
    console.log(result);
    return NextResponse.json({
      cli_id,
      cli_nombre,
      cli_municipio,
      cli_estado,
      cli_numero_contac,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
