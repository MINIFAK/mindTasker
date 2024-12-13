export function convertMinutesToHours(minutos: number) {
  const horas = Math.floor(minutos / 60); // Divide e arredonda para baixo
  const minutosRestantes = minutos % 60; // Pega o restante da divisão para os minutos

  return `${horas} horas e ${minutosRestantes} minutos`;
}