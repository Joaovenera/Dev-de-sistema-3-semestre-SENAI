export function removeZeroLeft(number: string) {
  if (number.length === 1) return number;
  return number[0] === "0" ? number.slice(1) : number;
}
/**
 * // Sujestão de correção
 * export function removeZeroLeft(number: string) {
 * return number.replace(/^0+/, '') || "0";  // Retorna "0" se o resultado for vazio
 * }

 */