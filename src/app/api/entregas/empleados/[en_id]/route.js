import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const sql = `
    SELECT empleado_entraga.* , empleados.emp_nombre, empleados.emp_apellido, empleados.emp_rol, empleados.emp_foto
  	FROM empleado_entraga
  	JOIN entregas ON empleado_entraga.en_id = entregas.en_id 
  	JOIN empleados ON empleado_entraga.emp_id = empleados.emp_id
    WHERE empleado_entraga.en_id = ?`;
  try {
    const result = await connection.query(sql, [params.en_id])
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  } finally {
    connection.quit();
  }
}
export async function DELETE(request, { params }) {
  try {
    const result = await connection.query(
      "DELETE FROM empleado_entraga WHERE en_id = ?",
      [params.en_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Empleado no encontrados" },
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