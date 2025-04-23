import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET() {
  const sql = `
    SELECT productos.produc_nombre, historial.*
    FROM historial
    JOIN productos ON historial.produc_id = productos.produc_id;`;

  try {
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
    connection.quit(); // Cierra la conexión después de finalizar
  }
}

export async function POST(request) {
  try {
    const {
      produc_id,
      hist_estado,
      hist_cantidad,
      hist_precio_ent_sal,
      hist_hora,
      hist_dia,
      hist_motivo,
    } = await request.json();
    
    const query = `INSERT INTO historial (produc_id, hist_estado, hist_cantidad, hist_precio_ent_sal, hist_hora, hist_dia, hist_motivo) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const result = await connection.query(query, [
      produc_id,
      hist_estado,
      hist_cantidad,
      hist_precio_ent_sal,
      hist_hora,
      hist_dia,
      hist_motivo,
    ]);
    console.log(result);
    return NextResponse.json(
      {
        produc_id,
        hist_estado,
        hist_cantidad,
        hist_precio_ent_sal,
        hist_hora,
        hist_dia,
        hist_motivo,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
