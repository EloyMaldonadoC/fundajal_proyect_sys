import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request) {
  const sql = `
  	SELECT empleado_entraga.* , empleados.emp_nombre, empleados.emp_apellido, empleados.emp_rol, empleados.emp_foto
  	FROM empleado_entraga
  	JOIN entregas ON empleado_entraga.en_id = entregas.en_id 
  	JOIN empleados ON empleado_entraga.emp_id = empleados.emp_id`;
  try {
    const result = await connection.query(sql);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}

export async function POST(request) {
  try {
    const empleados = await request.json();
    const query = `INSERT INTO empleado_entraga (en_id, emp_id) VALUES ?`;
    const values = empleados.map(empleado => [
      empleado.en_id,
      empleado.emp_id,
    ])

    const result = await connection.query(query, [values]);

    console.log(result);
    return NextResponse.json("Empleados encontrados");
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}
