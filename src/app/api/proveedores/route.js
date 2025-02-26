import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request) {
  try {
    const result = await connection.query("SELECT * FROM proveedores");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}

export async function POST(request) {
  try {
    const {
      prov_id,
      prov_nombre,
      prov_numero_cont,
      prov_direccion,
      prov_municipio,
      prov_estado,
      prov_rfc,
    } = await request.json();
    const query = `INSERT INTO proveedores (prov_id, prov_nombre, prov_numero_cont, prov_direccion, prov_municipio, prov_estado, prov_rfc) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const result = await connection.query(query, [
      prov_id,
      prov_nombre,
      prov_numero_cont,
      prov_direccion,
      prov_municipio,
      prov_estado,
      prov_rfc,
    ]);
    console.log(result);
    return NextResponse.json({
      prov_id,
      prov_nombre,
      prov_numero_cont,
      prov_direccion,
      prov_municipio,
      prov_estado,
      prov_rfc,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit() // Cierra la conexión después de finalizar
  }
}
