import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || 1;
    const limit = url.searchParams.get("limit") || 10;
    const access = url.searchParams.get("access") || null;
    const user = url.searchParams.get("user") || null;

    const offset = (page - 1) * limit;
    // Realiza consultas independientes para cada tabla

    if (access === "Admin") {
      const [
        entregas,
        vehiculos,
        empleados,
        clientes,
        entrega_vehiculo,
        empleado_entraga,
      ] = await connection.query(
          `SELECT e.* FROM (SELECT DISTINCT en_id FROM empleado_entraga) ee
          JOIN entregas e ON ee.en_id = e.en_id
          ORDER BY e.en_dia_entrega IS NULL THEN 0 ELSE 1 END,
          e.en_dia_entrega DESC LIMIT ${limit} OFFSET ${offset};
          
          SELECT * FROM vehiculos;
    
          SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, 
          emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados;
    
          SELECT * FROM clientes;
    
          SELECT * FROM entrega_vehiculo;
    
          SELECT * FROM empleado_entraga;`
      );
      const data = entregas.map((entrega) => ({
        en_dia_entrega: entrega.en_dia_entrega,
        entrega: entrega,
        encargado: empleados.find((emp) => emp.emp_id === entrega.emp_id),
        vehiculos: vehiculos.filter((v) =>
          entrega_vehiculo.some(
            (ev) => ev.en_id === entrega.en_id && ev.ve_id === v.ve_id
          )
        ),
        empleados: empleados.filter((emp) =>
          empleado_entraga.some(
            (ee) => ee.en_id === entrega.en_id && ee.emp_id === emp.emp_id
          )
        ),
        cliente: clientes.find((c) => c.cli_id === entrega.cli_id),
      }));

      return NextResponse.json(data);
    }
    if (access === "en") {
      const [
        entregas,
        vehiculos,
        empleados,
        clientes,
        entrega_vehiculo,
        empleado_entraga,
      ] = await connection.query(
        `SELECT *
          FROM entregas
          WHERE emp_id = ${user}
          ORDER BY CASE WHEN entregas.en_dia_entrega IS NULL THEN 0 ELSE 1 END,
          entregas.en_dia_entrega DESC
          LIMIT ${limit} OFFSET ${offset};
          
          SELECT * FROM vehiculos;
    
          SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, 
          emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados;
    
          SELECT * FROM clientes;
    
          SELECT * FROM entrega_vehiculo;
    
          SELECT * FROM empleado_entraga;`
      );
      const data = entregas.map((entrega) => ({
        en_dia_entrega: entrega.en_dia_entrega,
        entrega: entrega,
        encargado: empleados.find((emp) => emp.emp_id === entrega.emp_id),
        vehiculos: vehiculos.filter((v) =>
          entrega_vehiculo.some(
            (ev) => ev.en_id === entrega.en_id && ev.ve_id === v.ve_id
          )
        ),
        empleados: empleados.filter((emp) =>
          empleado_entraga.some(
            (ee) => ee.en_id === entrega.en_id && ee.emp_id === emp.emp_id
          )
        ),
        cliente: clientes.find((c) => c.cli_id === entrega.cli_id),
      }));

      return NextResponse.json(data);
    }
    if (access === null && user) {
      const [
        entregas,
        vehiculos,
        empleados,
        clientes,
        entrega_vehiculo,
        empleado_entraga,
      ] = await connection.query(
        `SELECT entregas.*
        FROM empleado_entraga
        JOIN entregas ON empleado_entraga.en_id = entregas.en_id
        WHERE empleado_entraga.emp_id = ${user}
        ORDER BY CASE WHEN entregas.en_dia_entrega IS NULL THEN 0 ELSE 1 END,
        entregas.en_dia_entrega DESC
        LIMIT ${limit} OFFSET ${offset};

        SELECT * FROM vehiculos;

        SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, 
        emp_rol, emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario 
        FROM empleados;

        SELECT * FROM clientes;

        SELECT * FROM entrega_vehiculo;

        SELECT * FROM empleado_entraga;`
      );
      const data = entregas.map((entrega) => ({
        en_dia_entrega: entrega.en_dia_entrega,
        entrega: entrega,
        encargado: empleados.find((emp) => emp.emp_id === entrega.emp_id),
        vehiculos: vehiculos.filter((v) =>
          entrega_vehiculo.some(
            (ev) => ev.en_id === entrega.en_id && ev.ve_id === v.ve_id
          )
        ),
        empleados: empleados.filter((emp) =>
          empleado_entraga.some(
            (ee) => ee.en_id === entrega.en_id && ee.emp_id === emp.emp_id
          )
        ),
        cliente: clientes.find((c) => c.cli_id === entrega.cli_id),
      }));

      return NextResponse.json(data);
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
