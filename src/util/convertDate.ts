export function convertMinutesToHours(minutos: number) {
  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;

  if (horas === 0)
    return `${minutosRestantes} minuto${minutosRestantes > 1 ? "s" : ""}`;

  if (minutosRestantes === 0) return `${horas} hora${horas > 1 ? "s" : ""}`;

  if (horas === 0 && minutosRestantes === 0) return "0 minuto";

  return `${horas} hora${horas > 1 ? "s" : ""} e ${minutosRestantes} minuto${
    minutosRestantes > 1 ? "s" : ""
  }`;
}
export function convertMinutesInHour(minutos: number) {
  const horas = Math.floor(minutos / 60);

  return horas;
}

export function convertMinutesToPorcent(minutos: number, total: number) {
  const porcent = (minutos / total) * 100;

  return porcent.toFixed(0);
}

export function convertDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
