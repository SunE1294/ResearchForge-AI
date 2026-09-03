import enMessages from "../../messages/en.json";
import bnMessages from "../../messages/bn.json";

export type MessagesType = typeof enMessages;

const translations: Record<"en" | "bn", any> = {
  en: enMessages,
  bn: bnMessages,
};

export function getTranslation(locale: "en" | "bn", path: string): string {
  const parts = path.split(".");
  let current: any = translations[locale] || translations.en;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      // Fallback to English
      let fallbackCurrent: any = translations.en;
      for (const fPart of parts) {
        if (fallbackCurrent && typeof fallbackCurrent === "object" && fPart in fallbackCurrent) {
          fallbackCurrent = fallbackCurrent[fPart];
        } else {
          return path;
        }
      }
      return typeof fallbackCurrent === "string" ? fallbackCurrent : path;
    }
  }

  return typeof current === "string" ? current : path;
}

export function useI18n(locale: "en" | "bn" = "en") {
  return {
    t: (path: string) => getTranslation(locale, path),
    locale,
  };
}
