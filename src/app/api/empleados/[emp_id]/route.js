import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const result = await connection.query(`
      SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, 
      emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario
      FROM empleados WHERE emp_id = ?;`,
      [params.emp_id]
    );
    if (result.length == 0) {
      return NextResponse.json(
        { message: "Empleado no encontrado" },
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
    console.log(data);
    const result = await connection.query(
      "UPDATE empleados SET ? WHERE emp_id = ?",
      [data, params.emp_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Empleado no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await connection.query(`
      SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, 
      emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario
      FROM empleados WHERE emp_id = ?;`,
      [params.emp_id]
    );
    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const result = await connection.query(
      "DELETE FROM empleados WHERE emp_id = ?",
      [params.emp_id]
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
