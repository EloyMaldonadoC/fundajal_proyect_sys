function formatNumber(number) {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
function formatTimeWithoutSeconds (timeString) {
  if (timeString != null) {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  } else {
    return "Hora no especificada";
  }
};
function getDayOfWeek (dateString) {
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
};

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
  horas = horas < 10 ? '0' + horas : horas;
  minutos = minutos < 10 ? '0' + minutos : minutos;
  segundos = segundos < 10 ? '0' + segundos : segundos;

  return horas + ':' + minutos + ':' + segundos;
}

export { formatNumber, getDayOfWeek, formatTimeWithoutSeconds, formatDay, obtenerHoraActual };