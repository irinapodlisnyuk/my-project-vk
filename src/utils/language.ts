const languageMap: Record<string, string> = {
  en: "Английский",
  ru: "Русский",
  fr: "Французский",
  es: "Испанский",
  de: "Немецкий",
  it: "Итальянский",
  zh: "Китайский",
  ja: "Японский",
  ko: "Корейский",

};

export const getLanguageName = (code: string): string => {
  const normalizedCode = code.toLowerCase().trim();
  return languageMap[normalizedCode] || code.toUpperCase();
};
