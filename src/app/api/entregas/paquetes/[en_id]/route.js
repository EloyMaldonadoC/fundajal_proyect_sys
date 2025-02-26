import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, { params }) {
  const sql = `SELECT paquetes.*, entrega_paquete.*
        FROM entrega_paquete
        JOIN entregas ON entrega_paquete.en_id = entregas.en_id 
        JOIN paquetes ON entrega_paquete.pa_id = paquetes.pa_id
        WHERE entrega_paquete.en_id = ?`;
  try {
    const result = await connection.query(sql, [params.en_id]);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}

export async function DELETE(request, { params }) {
  try {
    const result = await connection.query(
      "DELETE FROM entrega_paquete WHERE en_id = ?",
      [params.en_id]
    );
    if (result.affectedRows > 0) {
      return NextResponse.json(
        { message: "Paquete eliminado" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Paquete no encontrado" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}
