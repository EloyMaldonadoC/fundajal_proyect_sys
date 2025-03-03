import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request) {
  try {
    const result = await connection.query("SELECT * FROM vehiculos");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}

export async function POST(request) {
  try {
    const {
      ve_marca,
      ve_modelo,
      ve_ano,
      ve_agencia,
      ve_capacidad,
      ve_entidad,
      ve_placas,
      ve_propietario,
      ve_estatus_gen,
      ve_observaciones,
      ve_referendo,
      ve_imagen,
    } = await request.json();
    const query = `INSERT INTO vehiculos (
        ve_marca,
        ve_modelo,
        ve_ano,
        ve_agencia,
        ve_capacidad,
        ve_entidad,
        ve_placas,
        ve_propietario,
        ve_estatus_gen,
        ve_observaciones,
        ve_referendo,
        ve_imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await connection.query(query, [
      ve_marca,
      ve_modelo,
      ve_ano,
      ve_agencia,
      ve_capacidad,
      ve_entidad,
      ve_placas,
      ve_propietario,
      ve_estatus_gen,
      ve_observaciones,
      ve_referendo,
      ve_imagen,
    ]);
    console.log(result);
    return NextResponse.json({
      ve_marca,
      ve_modelo,
      ve_ano,
      ve_agencia,
      ve_capacidad,
      ve_entidad,
      ve_placas,
      ve_propietario,
      ve_estatus_gen,
      ve_observaciones,
      ve_referendo,
      ve_imagen,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
