import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";
import { obtenerDiaActual, obtenerDomingoDeSemana, obtenerLunesmondayeSemana, obtenerViernesDeSemana } from "@/functions/utilsFormat";

export async function GET() {
  try {
    // Obtenemos el dia actual
    const diaActual = obtenerDiaActual();
    const lunes = obtenerLunesmondayeSemana(diaActual);
    const viernes = obtenerViernesDeSemana(diaActual);
    console.log(lunes, viernes);
    // Verificamos si el lunes de la semana actual existe en la base de datos
    const [resultPeriodo] = await connection.query(
      "SELECT * FROM periodo_inventario WHERE DATE(per_inicio_semana) = DATE(?)",
      [lunes]
    );
    // Si no existe, lo creamos
    if (!resultPeriodo) {
      const result = await connection.query(
        "INSERT INTO periodo_inventario (per_inicio_semana, per_fin_semana) VALUES (?, ?)",
        [lunes, viernes]
      );
      // Obtenemos los productos que tienen existencias
      const resultPoductos = await connection.query(
        "SELECT * FROM productos;"
      );
      console.log(resultPoductos);
      // Creamos un array de productos con existencias
      const inicioDeInventario = await resultPoductos.map((producto) => {
        return {
          produc_id: producto.produc_id,
          per_id: result.insertId,
          inv_cantidad_inicio: producto.produc_existencias,
          inv_cantidad: producto.produc_existencias,
          inv_salidas: 0,
          inv_entradas: 0,
        };
      })
      // Insertamos los productos en la tabla de inventario
      const queries = await inicioDeInventario.map((producto) => {
        return `INSERT INTO inventario_semanal (produc_id, per_id, inv_cantidad_inicio, inv_cantidad, inv_salidas, inv_entradas) VALUES (${producto.produc_id}, ${producto.per_id}, ${producto.inv_cantidad_inicio}, ${producto.inv_cantidad}, ${producto.inv_salidas}, ${producto.inv_entradas})`;
      });
      // Ejecutamos todas las consultas
      const results = await Promise.all(
        queries.map((query) => connection.query(query))
      );
      console.log(results);
      return NextResponse.json("Periodo de inventario creado correctamente");
    } else {
      // Si existe, devolvemos un mensaje
      return NextResponse.json("El periodo de inventario ya existe");
    }
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
    connection.quit(); // Cerramos la conexión
  }
}
