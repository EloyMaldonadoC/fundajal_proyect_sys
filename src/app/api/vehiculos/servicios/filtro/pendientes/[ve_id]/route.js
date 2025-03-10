import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const { ve_id } = await params;
    const result = await connection.query(
      "SELECT * FROM servicios WHERE ve_id = ? AND ser_estado = 'pendiente';",
      [ve_id]
    );

    if (result.length == 0) {
      return NextResponse.json(
        { message: "servicio no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
