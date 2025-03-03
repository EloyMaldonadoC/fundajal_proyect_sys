import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(req, { params }) {
  try {
    const { en_id } = params;

    // Realiza consultas independientes para cada tabla
    const [entregas, vehiculos, empleados, clientes, entrega_vehiculo, empleado_entraga, productos, paquetes, productos_paquete, producto_estado] = await connection.query(
        `SELECT * FROM entregas WHERE en_id = ?;
        SELECT * FROM vehiculos;
        SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados;
        SELECT * FROM clientes;
        SELECT * FROM entrega_vehiculo WHERE en_id = ?;
        SELECT * FROM empleado_entraga WHERE en_id = ?;
        SELECT productos.*, entrega_producto.*
        FROM entrega_producto
        JOIN entregas ON entrega_producto.en_id = entregas.en_id 
        JOIN productos ON entrega_producto.produc_id = productos.produc_id
        WHERE entrega_producto.en_id = ?;
        SELECT paquetes.*, entrega_paquete.*
        FROM entrega_paquete
        JOIN entregas ON entrega_paquete.en_id = entregas.en_id 
        JOIN paquetes ON entrega_paquete.pa_id = paquetes.pa_id
        WHERE entrega_paquete.en_id = ?;
        SELECT entrega_paquete.*, producto_paquete.*, productos.*
        FROM entrega_paquete
        JOIN producto_paquete ON entrega_paquete.pa_id = producto_paquete.pa_id 
        JOIN productos ON producto_paquete.produc_id = productos.produc_id
        WHERE entrega_paquete.en_id = ?;
        SELECT entrega_estado_producto.*, productos.*
        FROM productos
        JOIN entrega_estado_producto ON productos.produc_id = entrega_estado_producto.produc_id
        WHERE entrega_estado_producto.en_id = ?;`
      , [en_id, en_id, en_id, en_id, en_id, en_id, en_id]
    );

    const data = entregas.map(entrega => ({
      en_id: entrega.en_id,
      entrega: entrega,
      encargado: empleados.find(emp => emp.emp_id === entrega.emp_id),
      vehiculos: vehiculos.filter(v => entrega_vehiculo.some(ev => ev.en_id === entrega.en_id && ev.ve_id === v.ve_id)),
      empleados: empleados.filter(emp => empleado_entraga.some(ee => ee.en_id === entrega.en_id && ee.emp_id === emp.emp_id)),
      cliente: clientes.find(c => c.cli_id === entrega.cli_id),
      productos: productos,
      paquetes: paquetes,
      productos_paquete: productos_paquete,
        producto_estado: producto_estado
    }));

    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.quit();
  }
}
