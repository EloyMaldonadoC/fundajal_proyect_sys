function formatNumber(number) {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
function formatTimeWithoutSeconds(timeString) {
  if (timeString != null) {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  } else {
    return "Hora no especificada";
  }
}
function getDayOfWeek(dateString) {
  if (dateString != null) {
    const daysOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const monthsOfYear = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = monthsOfYear[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${dayOfWeek} ${day} de ${month} del ${year}`;
  } else {
    return "Aún no se ha programado una fecha de entrega";
  }
}

function formatDay(day) {
  const dayformat = new Date(day).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return dayformat;
}

function obtenerHoraActual() {
  var ahora = new Date();
  var horas = ahora.getHours();
  var minutos = ahora.getMinutes();
  var segundos = ahora.getSeconds();

  // Añadir un cero delante si es necesario
  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;

  return horas + ":" + minutos + ":" + segundos;
}

function obtenerDiaActual() {
  var ahora = new Date();
  var dia = ahora.getDate();
  var mes = ahora.getMonth() + 1; // Los meses son indexados desde 0
  var anio = ahora.getFullYear();

  // Añadir un cero delante si es necesario
  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;

  return anio + "-" + mes + "-" + dia;
}

function obtenerLunesmondayeSemana(fecha) {
  const date = new Date(fecha);
  const dayOfWeek = date.getDay(); // Obtiene el día de la semana (0 = Domingo, 1 = Lunes, etc.)
  const monday = new Date(date); // Copia la fecha original
  monday.setDate(date.getDate() - (dayOfWeek - 1)); // Retrocede hasta el lunes (si ya es lunes, no cambia)
  var dia = monday.getDate();
  var mes = monday.getMonth() + 1; // Los meses son indexados desde 0
  var anio = monday.getFullYear();

  // Añadir un cero delante si es necesario
  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;

  return anio + "-" + mes + "-" + dia;
}
function obtenerViernesDeSemana(fecha) {
  const date = new Date(fecha);
  const dayOfWeek = date.getDay(); // Obtiene el día de la semana (0 = Domingo, 1 = Lunes, etc.)
  const friday = new Date(date); // Copia la fecha original
  friday.setDate(date.getDate() + (5 - dayOfWeek) % 7); // Ajusta hasta el viernes
  var dia = friday.getDate();
  var mes = friday.getMonth() + 1; // Los meses son indexados desde 0
  var anio = friday.getFullYear();

  // Añadir un cero delante si es necesario
  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;

  return anio + "-" + mes + "-" + dia;
}

function obtenerDomingoDeSemana(fecha) {
  const date = new Date(fecha);
  const dayOfWeek = date.getDay(); // Obtiene el día de la semana (0 = Domingo, 1 = Lunes, etc.)
  const sunday = new Date(date); // Copia la fecha original
  sunday.setDate(date.getDate() + (7 - dayOfWeek) % 7); // Ajusta hasta el domingo
  var dia = sunday.getDate();
  var mes = sunday.getMonth() + 1; // Los meses son indexados desde 0
  var anio = sunday.getFullYear();

  // Añadir un cero delante si es necesario
  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;

  return anio + "-" + mes + "-" + dia;
}

function esDiaDentroDeSemana(fecha) {
  const fechaDada = fecha.split("T")[0]; // Obtener solo la fecha sin la hora
  console.log("fechaDada", fechaDada)
  // Obtener la fecha actual
  const hoy = new Date();
  // Obtener el lunes de esta semana
  const diaSemana = hoy.getDay();
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() - (diaSemana === 0 ? 6 : diaSemana - 1));
  const lunesEstaSemana = lunes.toISOString().split("T")[0]; // Obtener solo la fecha sin la hora
  console.log("lunesEstaSemana", lunesEstaSemana);
  
  // Comparar si la fecha proporcionada está dentro del rango
  return fechaDada == lunesEstaSemana;
}

function esDiaLaboral() {
  const hoy = new Date();
  const diaSemana = hoy.getDay(); // Obtiene el día de la semana (0 = domingo, 6 = sábado)
  const horaActual = hoy.getHours(); // Obtiene la hora actual
  console.log(hoy)
  // Lógica para lunes después de las 9:00 a.m.
  if (diaSemana === 1 && horaActual >= 9) {
      return true;
  }

  // Lógica para viernes después de las 8:00 p.m.
  if (diaSemana === 5 && horaActual >= 20) {
      return false;
  }

  // Verifica si el día está entre martes (2) y jueves (4), o lunes antes de las 9 a.m., o viernes antes de las 8 p.m.
  return diaSemana >= 1 && diaSemana <= 5;
}

function sumarProductos(lista) {
  let suma = 0;
  lista.forEach((producto) => {
    suma += producto.en_es_produc_cant;
  });
  return suma;
}

export {
  formatNumber,
  getDayOfWeek,
  formatTimeWithoutSeconds,
  formatDay,
  obtenerHoraActual,
  obtenerDiaActual,
  sumarProductos,
  obtenerLunesmondayeSemana,
  obtenerDomingoDeSemana,
  obtenerViernesDeSemana,
  esDiaDentroDeSemana,
  esDiaLaboral
};
