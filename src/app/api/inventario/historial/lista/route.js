import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function POST(request) {
    try {
      const historial = await request.json();
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
      connection.quit() // Cierra la conexión después de finalizar
    }
  }