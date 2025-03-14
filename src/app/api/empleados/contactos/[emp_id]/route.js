import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const { emp_id } = await params;
    console.log(emp_id);
    const result = await connection.query(`
      SELECT clientes.*
      FROM clientes 
      JOIN vendedor_municipio ON clientes.cli_id = vendedor_municipio.cli_id
      WHERE vendedor_municipio.emp_id = ?;`,[emp_id]
    );
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}

export async function DELETE(request, { params }) {
  try {
    const { emp_id } = await params;
    const result = await connection.query(
      "DELETE FROM vendedor_municipio WHERE emp_id = ?",
      [emp_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Empleado no encontrado" },
        { status: 404 }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}
