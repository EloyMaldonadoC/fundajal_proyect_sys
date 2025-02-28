import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const data = `%${params.data}%`;
  console.log(data);

  const sql = `SELECT * FROM vehiculos WHERE ve_estatus_gen LIKE ? ;`

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
  }
}
