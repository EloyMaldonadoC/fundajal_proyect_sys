import bcrypt from "bcrypt";
import { getStoredPassword, getStoredUser } from "../libs/mysql";

export async function hashPassword(password) {
  const salt = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("Error hashing password", error);
    throw new Error("Error hashing password");
  }
}

export async function verifyPassword(username, password) {

  try {
    console.log("usuario", username);
    console.log("contraseña", password);
    const storedPassword = await getStoredPassword(username);
    console.log("Contraseña almacenada", storedPassword);
    const isMatch = await bcrypt.compare(password, storedPassword);
    console.log("isMatch", isMatch);
    if (isMatch) {
      const user = await getStoredUser(username);
      return {
        id: user.emp_id,
        name: user.emp_nombre,
        lastname: user.emp_apellido,
        phone: user.emp_num_tel,
        role: user.emp_rol,
        state: user.emp_estado,
        entryHour: user.emp_hora_entrada,
        exitHour: user.emp_hora_salida,
        photo: user.emp_foto,
        username: user.emp_usuario,
      };
    }
    return isMatch;
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}
