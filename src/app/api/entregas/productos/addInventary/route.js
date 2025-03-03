import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function PUT(request, { params }) {
  try {
    const productos = await request.json();
    const queries = productos.map((producto) => {
      return `UPDATE productos SET produc_existencias = produc_existencias + ${producto.en_es_produc_cant} WHERE produc_id = ${producto.produc_id}`;
    });
    console.log(productos);
    const results = await Promise.all(
      queries.map((query) => connection.query(query))
    );
    console.log(results);
    return NextResponse.json("Existencias de productos actualizadas");
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
