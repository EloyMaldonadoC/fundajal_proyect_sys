import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";
import { obtenerDiaActual, obtenerLunesmondayeSemana } from "@/functions/utilsFormat";

export async function GET() {
  try {
    const sql = `SELECT inventario_semanal.*, productos.produc_nombre, periodo_inventario.per_inicio_semana, periodo_inventario.per_fin_semana
FROM inventario_semanal
JOIN productos ON inventario_semanal.produc_id = productos.produc_id
JOIN periodo_inventario ON inventario_semanal.per_id = periodo_inventario.per_id
ORDER BY periodo_inventario.per_inicio_semana DESC;`;

    const result = await connection.query(sql);
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
    connection.quit();
  }
}

export async function POST(request) {
  try {
    const {
      produc_id,
      inv_cantidad,
      inv_cantidad_inicio,
      inv_salidas,
      inv_entradas,
    } = await request.json();

    // Obtenemos el dia actual
    const diaActual = obtenerDiaActual();
    const lunes = obtenerLunesmondayeSemana(diaActual);
    // Verificamos si el lunes de la semana actual existe en la base de datos
    const [resultPeriodo] = await connection.query(
      "SELECT * FROM periodo_inventario WHERE DATE(per_inicio_semana) = DATE(?)",
      [lunes]
    );
    const query = `INSERT INTO inventario_semanal (per_id, produc_id, inv_cantidad, inv_cantidad_inicio, inv_salidas, inv_entradas) VALUES (?, ?, ?, ?, ?, ?)`;
    const result = await connection.query(query, [
      resultPeriodo.per_id,
      produc_id,
      inv_cantidad,
      inv_cantidad_inicio,
      inv_salidas,
      inv_entradas,
    ]);
    console.log(result);
    return NextResponse.json({
      per_id: resultPeriodo.per_id,
      produc_id,
      inv_cantidad,
      inv_cantidad_inicio,
      inv_salidas,
      inv_entradas,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}

export async function PUT(request, { params }) {
  try {
    const historial = await request.json();
    console.log(historial);
    // Obtenemos el dia actual
    const diaActual = obtenerDiaActual();
    const lunes = obtenerLunesmondayeSemana(diaActual);
    //Creamos las nuevas entradas al inventario semanal
    const [periodo] = await connection.query(
      "SELECT * FROM periodo_inventario WHERE DATE(per_inicio_semana) = DATE(?)",
      [lunes]
    );
    console.log(periodo);
    if (historial.hist_estado == "salida") {
      console.log("Salida");
      const query = `UPDATE inventario_semanal
                  SET inv_cantidad = inv_cantidad - ${historial.hist_cantidad},
                  inv_salidas = inv_salidas + ${historial.hist_cantidad}
                  WHERE produc_id = ${historial.produc_id} AND per_id = ${periodo.per_id};`;
      console.log(query);
      const result = await connection.query(query);  
      console.log(result);
    } else {
      console.log("Entrada");
      const query = `UPDATE inventario_semanal
                  SET inv_cantidad = inv_cantidad + ${historial.hist_cantidad},
                  inv_entradas = inv_entradas + ${historial.hist_cantidad}
                  WHERE produc_id = ${historial.produc_id} AND per_id = ${periodo.per_id};`;
      console.log(query);
      const result = await connection.query(query);  
      console.log(result);
    }    

    return NextResponse.json({ message: "Inventario actualizado", status: 200 });
  } catch (error) {
    console.log(error);
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