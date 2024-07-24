import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET() {

    const sql = 
        `SELECT productos.*, proveedores.*, proveedir_producto.prov_produc_precio
        FROM proveedir_producto
        JOIN productos ON proveedir_producto.produc_id = productos.produc_id
        JOIN proveedores ON proveedir_producto.prov_id = proveedores.prov_id;`

    try {
        const result = await connection.query(sql)
        return NextResponse.json(result)
    }catch (error) {
        return NextResponse.json(
            {
                message: error.message
            },
            {
                status: 500
            }
        )
    }
}