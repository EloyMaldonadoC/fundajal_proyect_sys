import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function PUT(request, { params }) {
  try {
    const query = `SELECT entrega_estado_producto.*, productos.*, entrega_producto.en_produc_precio
    FROM productos
    JOIN entrega_producto ON productos.produc_id = entrega_producto.produc_id
    JOIN entrega_estado_producto ON entrega_producto.en_id = entrega_estado_producto.en_id AND productos.produc_id = entrega_estado_producto.produc_id
    WHERE entrega_estado_producto.en_id = ?;`;

    const inventario = await connection.query(query, [params.en_id]);

    const productos = inventario.map((producto) => {
      return {
        produc_id: Number(producto.produc_id),
        produc_existencias: Number(producto.produc_existencias),
        en_produc_precio: Number(producto.en_produc_precio),
        nueva_existencia:
          Number(producto.produc_existencias) -
          Number(producto.en_es_produc_cant),
      };
    });

    const queries = productos.map((producto) => {
      return `UPDATE productos SET produc_existencias = ${producto.nueva_existencia} WHERE produc_id = ${producto.produc_id}`;
    });
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
