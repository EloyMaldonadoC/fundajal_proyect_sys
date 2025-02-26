import { NextResponse } from "next/server";
import { connection } from "@/libs/mysql";

export async function GET(request, {params}) {
    
    const data = `%${params.nombre}%`
    console.log(data)

    const sql = 
        `SELECT * FROM paquetes
        WHERE pa_nombre LIKE ? ;`

    try {
        const result = await connection.query(sql, data)
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
    } finally {
        connection.quit() // Cierra la conexión después de finalizar
      }
}