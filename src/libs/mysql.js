import mysql from "serverless-mysql";

export const connection = mysql({
  config: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    multipleStatements: true,
  },
  pool: {
    maxConnections: 10, // Número máximo de conexiones en el pool
    minConnections: 2,  // Número mínimo de conexiones en el pool
    idleTimeout: 30000  // Tiempo de espera antes de cerrar conexiones inactivas (en milisegundos)
  }
});

export async function getStoredPassword(username) {
  try {
    console.log(username);
    const query = "SELECT emp_contraseña FROM empleados WHERE emp_usuario = ?";
    console.log("Ejecutando consulta:", query);
    const results = await connection.query(query, [username]);
    console.log("Resultados de la consulta:", results);
    if (results.length === 0) {
      console.warn("Usuario no encontrado");
      return null;
    }
    console.log("Contraseña encontrada:", results[0].emp_contraseña);
    return results[0].emp_contraseña;
  } catch (error) {
    console.error(error);
  } finally {
    connection.quit();
  }
  
}

export async function getStoredUser(username) {
  try {
    const query = "SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados WHERE emp_usuario = ?";
    const results = await connection.query(query, [username]);
    if (results.length === 0) {
      console.warn("Usuario no encontrado");
      return null;
    }
    return results[0];
    
    return new Promise((resolve, reject) => {
      const query = "SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados WHERE emp_usuario = ?";
      connection.query(query, [username], (error, results) => {
        if (error) return reject(error);
        if (results.length === 0) return reject(new Error("User not found"));
        resolve(results[0]);
      });
    }); 
  } catch (error) {
    console.error(error);
  } finally {
    connection.quit();
  }
}
