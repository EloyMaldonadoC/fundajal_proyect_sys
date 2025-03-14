import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET() {
  try {
    const result = await connection.query(`
        SELECT clientes.*
        FROM clientes 
        JOIN vendedor_municipio ON clientes.cli_id = vendedor_municipio.cli_id;
    `); 
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}

export async function POST(request) {
  try {
    const { emp_id, cli_id } = await request.json();
    const query = `INSERT INTO vendedor_municipio (emp_id, cli_id) VALUES (?, ?)`;
    const result = await connection.query(query, [ emp_id, cli_id ]);
    console.log(result);
    return NextResponse.json({ emp_id, cli_id });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
