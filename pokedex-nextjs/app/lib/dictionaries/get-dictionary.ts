import "server-only";

const dictionaries = {
  ko: () => import("./ko.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
  zh: () => import("./zh.json").then((module) => module.default),
};

export const getDictionary = async (locale: "ko" | "en" | "zh") => {
  if (!dictionaries[locale]) {
    return dictionaries["ko"]();
  }
  return dictionaries[locale]();
};
