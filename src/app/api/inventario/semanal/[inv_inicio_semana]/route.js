import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";
import { obtenerLunesmondayeSemana } from "@/functions/utilsFormat";

export async function GET(request, { params }) {
  try {
    const { inv_inicio_semana } = await params;
    // Obtenemso el lunes de la semana actual
    const lunes = obtenerLunesmondayeSemana(inv_inicio_semana);
    const sql = `SELECT inventario_semanal.*, productos.*
        FROM inventario_semanal
        JOIN productos ON inventario_semanal.produc_id = productos.produc_id
        JOIN periodo_inventario ON inventario_semanal.per_id = periodo_inventario.per_id
        WHERE periodo_inventario.per_inicio_semana = DATE(?)
        ORDER BY productos.produc_nombre ASC;
        SELECT periodo_inventario.*
        FROM periodo_inventario
        WHERE periodo_inventario.per_inicio_semana = DATE(?);`;
    const [ inventario, periodo ]= await connection.query(sql, [lunes, lunes]);
    return NextResponse.json({
      inventario,
      periodo,
    });
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
    connection.quit();
  }
}
