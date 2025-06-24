import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || 1;
    const limit = url.searchParams.get("limit") || 30;
    const filter = url.searchParams.get("filter") || null;
    const user = url.searchParams.get("user") || null;
    const filtro_fecha = url.searchParams.get("filtro_fecha") || null;
    const modo = url.searchParams.get("modo") || null;
    
    const offset = (page - 1) * limit;
    // Realiza consultas independientes para cada tabla
    const [entregas, vehiculos, empleados, clientes, entrega_vehiculo, empleado_entraga] = await connection.query(
      `SELECT * 
      FROM entregas
      ${filter ? `WHERE en_estado LIKE "${filter}"` : ""} 
      ${filter && user ? `AND emp_id = ${user}` : user ? `WHERE emp_id = ${user}` : ""}
      ${(filter || user) && filtro_fecha ? "AND" : filtro_fecha && !(filter || user) ? "WHERE" : ""}
      ${filtro_fecha && modo === 'dia' 
          ? `DATE(en_dia_entrega) = DATE('${filtro_fecha}')`
          : filtro_fecha && modo === 'semana' 
            ? `YEARWEEK(en_dia_entrega, 1) = YEARWEEK('${filtro_fecha}', 1)`
            : filtro_fecha && modo === 'mes'
              ? `YEAR(en_dia_entrega) = YEAR('${filtro_fecha}') AND MONTH(en_dia_entrega) = MONTH('${filtro_fecha}')`
              : ""}
      ORDER BY 
        CASE WHEN en_dia_entrega IS NULL THEN 0 ELSE 1 END,
        en_dia_entrega DESC
      LIMIT ${limit} OFFSET ${offset};
      SELECT * FROM vehiculos;
      SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, 
      emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados;
      SELECT * FROM clientes;
      SELECT * FROM entrega_vehiculo;
      SELECT * FROM empleado_entraga;`
    );

    const data = entregas.map(entrega => ({
      en_id: entrega.en_id,
      entrega: entrega,
      encargado: empleados.find(emp => emp.emp_id === entrega.emp_id),
      vehiculos: vehiculos.filter(v => entrega_vehiculo.some(ev => ev.en_id === entrega.en_id && ev.ve_id === v.ve_id)),
      empleados: empleados.filter(emp => empleado_entraga.some(ee => ee.en_id === entrega.en_id && ee.emp_id === emp.emp_id)),
      cliente: clientes.find(c => c.cli_id === entrega.cli_id),
    }));

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
