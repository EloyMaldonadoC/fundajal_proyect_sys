import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const data = `%${params.data}%`;
  console.log(data);

  const sql = `SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, 
      emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario 
      FROM empleados WHERE emp_estado LIKE ? ;`;

  try {
    const result = await connection.query(sql, data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}
