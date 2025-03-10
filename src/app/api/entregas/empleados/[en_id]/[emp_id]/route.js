import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const { en_id, emp_id } = await params;
  const sql = `
    SELECT empleado_entraga.* , empleados.emp_nombre, empleados.emp_apellido, empleados.emp_rol, empleados.emp_foto
  	FROM empleado_entraga
  	JOIN entregas ON empleado_entraga.en_id = entregas.en_id 
  	JOIN empleados ON empleado_entraga.emp_id = empleados.emp_id
    WHERE empleado_entraga.en_id = ? AND empleado_entraga.emp_id = ?`;
  try {
    const result = await connection.query(sql, [en_id, emp_id]);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
export async function PUT(request, { params }) {
  try {
    const { en_id, emp_id } = await params;
    const data = await request.json();
    console.log(data);
    const result = await connection.query(
      "UPDATE empleado_entraga SET ? WHERE en_id = ? AND emp_id = ?",
      [data, en_id, emp_id]
    );

    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Empleado no encontrado" },
        { status: 404 }
      );
    }

    const updatedProduct = await connection.query(
        `SELECT empleado_entraga.* , empleados.emp_nombre, empleados.emp_apellido, empleados.emp_rol, empleados.emp_foto
  	    FROM empleado_entraga
  	    JOIN entregas ON empleado_entraga.en_id = entregas.en_id 
  	    JOIN empleados ON empleado_entraga.emp_id = empleados.emp_id
        WHERE empleado_entraga.en_id = ? AND empleado_entraga.emp_id = ?`,
      [en_id, emp_id]
    );
    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
export async function DELETE(request, { params }) {
  try {
    const { en_id, emp_id } = await params;
    const result = await connection.query(
      "DELETE FROM empleado_entraga WHERE en_id = ? AND emp_id = ?",
      [en_id, emp_id]
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
    connection.quit();
  }
}
