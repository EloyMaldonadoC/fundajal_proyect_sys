import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";
import { obtenerDomingoDeSemana, obtenerLunesmondayeSemana } from "@/functions/utilsFormat";

export async function GET(request, { params }) {
  try {
    const { per_inicio_semana } = await params;
    console.log(per_inicio_semana);
    // Buscar el día de inicio de semana
    const inicioSemana = obtenerLunesmondayeSemana(per_inicio_semana);
    const finSemana = obtenerDomingoDeSemana(per_inicio_semana);
    console.log(inicioSemana);
    console.log(finSemana);

    // Obtenemos todos los registros de la tabla periodo_inventario
    const [ result ] = await connection.query(
      "SELECT * FROM periodo_inventario WHERE DATE(per_inicio_semana) = DATE(?)",
      [inicioSemana]
    );

    if (!result) {
      const result = await connection.query(
        "INSERT INTO periodo_inventario (per_inicio_semana, per_fin_semana) VALUES (?, ?)",
        [inicioSemana, finSemana]
      );

      return NextResponse.json({
        per_id: result.insertId,
        per_inicio_semana: inicioSemana,
        per_fin_semana: finSemana,
      });
    }

    // Devolvemos todos los registros
    return NextResponse.json(result);
  } catch (error) {
    // Capturar y devolver errores
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
