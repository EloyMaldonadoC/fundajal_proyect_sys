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
  }
}

export async function POST(request) {
  try {
    const { en_id, emp_id } = await request.json();
    const sql = `INSERT INTO empleado_entrega (en_id, emp_id) VALUES (?, ?)`;
    const result = await connection.query(sql, [en_id, emp_id]);
    console.log(result);
    return NextResponse.json({ en_id, emp_id });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
