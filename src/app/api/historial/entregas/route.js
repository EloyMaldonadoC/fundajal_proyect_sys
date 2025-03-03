import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || 1;
    const limit = url.searchParams.get("limit") || 10;
    const filter = url.searchParams.get("filter") || null;
    const day = url.searchParams.get("day") || null;
    const month = url.searchParams.get("month") || null;

    const offset = (page - 1) * limit;

    const query = `
          SELECT entregas.*, clientes.*, deudas.* 
          FROM entregas 
          JOIN deudas ON entregas.en_id = deudas.en_id
          JOIN clientes ON entregas.cli_id = clientes.cli_id
          WHERE entregas.en_estado = "finalizada"`
    const filterState = `AND deudas.deu_estado = "${filter}"`;
    const filterWeek = `AND YEARWEEK(entregas.en_dia_entrega, 1) = YEARWEEK("${day}", 1)`;
    const filterMonth = `AND MONTH(entregas.en_dia_entrega) = MONTH(CURDATE()) AND YEAR(entregas.en_dia_entrega) = YEAR(CURDATE())`;
    const orderBy = `ORDER BY entregas.en_dia_entrega DESC`;
    const limitOffset = `LIMIT ${limit} OFFSET ${offset}`;

    const fullQuery = `${query} ${filter ? filterState : ""} ${day ? filterWeek : ""} ${month ? filterMonth : ""} ${orderBy} ${limitOffset}`;
    console.log(fullQuery);
    const entregas = await connection.query(fullQuery);

    return NextResponse.json(entregas, { status: 200 });    
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
