import { connection } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await connection.query("SELECT * from productos");
        return NextResponse.json(result);
    } catch (error) {
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

export async function POST(request) {
   try {
    const {produc_nombre, produc_existencias, produc_precio_venta} = await request.json();

    const sql = `INSERT INTO productos (produc_nombre, produc_existencias, produc_precio_venta) VALUES (?, ?, ?)`

    const result = await connection.query(sql, [
        produc_nombre,
        produc_existencias,
        produc_precio_venta
    ])

    return NextResponse.json({
        produc_id: result.insertId,
        produc_nombre,
        produc_existencias,
        produc_precio_venta
    })
   }
   catch (error) {
        console.log(error)
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