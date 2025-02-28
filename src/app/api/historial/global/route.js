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
      SELECT productos.produc_nombre, historial.*
      FROM historial
      JOIN productos ON historial.produc_id = productos.produc_id
    `
    const filterState = `WHERE historial.hist_estado LIKE "${filter}"`;
    const filterWeek = `${filter ? "AND" : "WHERE"} YEARWEEK(historial.hist_dia, 1) = YEARWEEK("${day}", 1)`;
    const filterMonth = `${filter ? "AND" : "WHERE"} MONTH(historial.hist_dia) = MONTH(CURDATE()) AND YEAR(historial.hist_dia) = YEAR(CURDATE())`;
    const orderBy = `ORDER BY historial.hist_dia DESC, historial.hist_hora DESC`;
    const limitOffset = `LIMIT ${limit} OFFSET ${offset}`;

    const fullQuery = `${query} ${filter ? filterState : ""} ${day ? filterWeek : ""} ${month ? filterMonth : ""} ${orderBy} ${limitOffset}`;
    const historial = await connection.query(fullQuery);

    return NextResponse.json(historial, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
