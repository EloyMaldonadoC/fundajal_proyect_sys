import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET() {
  try {
    const result = await connection.query(`
      SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, 
      emp_estado, emp_usuario, emp_hora_entrada, emp_hora_salida, emp_foto
      FROM empleados;
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
    const {
      emp_nombre,
      emp_apellido,
      emp_num_tel,
      emp_rol,
      emp_estado,
      emp_usuario,
      emp_contraseña,
      emp_hora_entrada,
      emp_hora_salida,
      emp_foto,
    } = await request.json();
    const query = `INSERT INTO empleados (emp_nombre, emp_apellido, emp_num_tel, emp_rol, emp_estado, emp_usuario, emp_contraseña, emp_hora_entrada, emp_hora_salida, emp_foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await connection.query(query, [
      emp_nombre,
      emp_apellido,
      emp_num_tel,
      emp_rol,
      emp_estado,
      emp_usuario,
      emp_contraseña,
      emp_hora_entrada,
      emp_hora_salida,
      emp_foto,
    ]);
    console.log(result);
    return NextResponse.json({
      emp_nombre,
      emp_apellido,
      emp_num_tel,
      emp_rol,
      emp_estado,
      emp_usuario,
      emp_contraseña,
      emp_hora_entrada,
      emp_hora_salida,
      emp_foto,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
