import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";
import { obtenerDiaActual, obtenerLunesmondayeSemana } from "@/functions/utilsFormat";

export async function POST(request) {
    try {
      const historial = await request.json();
      // Obtenemos el dia actual
      const diaActual = obtenerDiaActual();
      const lunes = obtenerLunesmondayeSemana(diaActual);
      console.log(lunes);
      // Obtenemos el id del periodo de inventario
      const [periodo] = await connection.query(
        "SELECT * FROM periodo_inventario WHERE DATE(per_inicio_semana) = DATE(?)",
        [lunes]
      );

      console.log(periodo.per_id);

      if (!periodo) {
        return NextResponse.json(
          { message: "No existe un periodo de inventario para esta semana" },
          { status: 404 }
        );
      }
      console.log(periodo.per_id);

      if (historial.length == 0) {
        return NextResponse.json(
          { message: "El historial está vacío, no hay productos para procesar" },
          { status: 400 }
        );
      }
      console.log(historial);
      if (historial[0].hist_estado == "salida") {
        console.log("salida");

        const queries = historial.map((hist) => {
          return `UPDATE inventario_semanal 
                  SET inv_cantidad = inv_cantidad - ${hist.hist_cantidad}, inv_salidas = inv_salidas + ${hist.hist_cantidad} 
                  WHERE produc_id = ${hist.produc_id} AND per_id = ${periodo.per_id}`;
        })
        const result = await Promise.all(
          queries.map((query) => connection.query(query))
        );
        console.log(result);
      } else {
        console.log("entrada");

        const queries = historial.map((hist) => {
          return `UPDATE inventario_semanal 
                  SET inv_cantidad = inv_cantidad + ${hist.hist_cantidad}, inv_entradas = inv_entradas + ${hist.hist_cantidad} 
                  WHERE produc_id = ${hist.produc_id} AND per_id = ${periodo.per_id}`;
        })
        const result = await Promise.all(
          queries.map((query) => connection.query(query))
        );
        console.log(result);
      }
      
      const query = `INSERT INTO historial (produc_id, hist_estado, hist_cantidad, hist_precio_ent_sal, hist_hora, hist_dia, hist_motivo) VALUES ?`;
      const values = historial.map(hist => [
        hist.produc_id,
        hist.hist_estado,
        hist.hist_cantidad,
        hist.hist_precio_ent_sal,
        hist.hist_hora,
        hist.hist_dia,
        hist.hist_motivo
      ])
      const result = await connection.query(query, [values]);
      
      console.log(result);
      
      return NextResponse.json("Productos agregados");
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } finally {
      connection.quit();
    }
  }