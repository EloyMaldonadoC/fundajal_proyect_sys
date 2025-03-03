import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET() {
  try {
    process.env.TZ = "America/Mexico/Guadalajara";
    const result = await connection.query(
      `SELECT DATE_FORMAT(NOW(), '%Y-%m-%d') AS fecha_actual`
    );
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.error({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
