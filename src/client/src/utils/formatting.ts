/**
 * Простая функция для форматирования больших чисел в строки типа "123.23 млн. ₽"
 * @param {number} num  число для форматирования
 * @returns {string} отформатированная строка
 */
export function formatNumber(num: number) {
  const suffixes = ["", "тыс.", "млн.", "млрд.", "трлн.", "квадр."];
  const tier = (Math.log10(Math.abs(num)) / 3) | 0;

  if (tier === 0) return `${num.toFixed(2)}`;

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);

  const scaledNumber = num / scale;

  const roundedNumber = Math.round(scaledNumber * 100) / 100;

  return `${roundedNumber.toFixed(1)} ${suffix} ₽`;
}
