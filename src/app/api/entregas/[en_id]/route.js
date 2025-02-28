import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const result = await connection.query(`
      SELECT entregas.*, clientes.*, empleados.emp_id, empleados.emp_nombre, 
      empleados.emp_apellido, empleados.emp_num_tel, empleados.emp_rol, 
      empleados.emp_estado, empleados.emp_hora_entrada, empleados.emp_hora_salida, 
      empleados.emp_foto, empleados.emp_usuario
      FROM entregas
      JOIN clientes ON entregas.cli_id = clientes.cli_id
      JOIN empleados ON entregas.emp_id = empleados.emp_id
      WHERE en_id = ?;`,
      [params.en_id]
    );
    if (result.length == 0) {
      return NextResponse.json(
        { message: "Entrega no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await connection.query(
      "UPDATE entregas SET ? WHERE en_id = ?",
      [data, params.en_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Entrega no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await connection.query(
      "SELECT * FROM entregas WHERE en_id = ?",
      [params.en_id]
    );
    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const result = await connection.query(
      "DELETE FROM entregas WHERE en_id = ?",
      [params.en_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Entrega no encontrado" },
        { status: 404 }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
