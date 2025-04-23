import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET() {
  try {
    // Obtenemos todos los registros de la tabla periodo_inventario
    const result = await connection.query("SELECT * FROM periodo_inventario");

    // Devolvemos todos los registros
    return NextResponse.json(result);
  } catch (error) {
    // Manejo de errores
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit(); // Cerramos la conexión
  }
}
export async function POST(request) {
  try {
    // Obtenemos los valores desde el cuerpo de la solicitud
    const { per_inicio_semana, per_fin_semana } = await request.json();

    // Insertamos los valores en la tabla periodo_inventario
    const result = await connection.query(
      "INSERT INTO periodo_inventario (per_inicio_semana, per_fin_semana) VALUES (?, ?)",
      [per_inicio_semana, per_fin_semana]
    );

    // Devolvemos el ID del registro creado
    return NextResponse.json({
      message: "Periodo creado correctamente",
      id: result.insertId,
    });
  } catch (error) {
    // Manejo de errores
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit(); // Cerramos la conexión
  }
}
