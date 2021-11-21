/**
 * TODO: Write some good docs about this
 */

import { DEFAULT_COLOR } from "../config";

const allColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

let allMissingClasses: string[] = [];
const includedTwClasses: string[] = [
  "to-gray-50 to-red-50 to-yellow-50 to-green-50 to-blue-50 to-indigo-50 to-purple-50 to-pink-50",
  "dark:to-gray-900 dark:to-red-900 dark:to-yellow-900 dark:to-green-900 dark:to-blue-900 dark:to-indigo-900 dark:to-purple-900 dark:to-pink-900",
  "text-gray-900 text-red-900 text-yellow-900 text-green-900 text-blue-900 text-indigo-900 text-purple-900 text-pink-900",
  "dark:text-gray-50 dark:text-red-50 dark:text-yellow-50 dark:text-green-50 dark:text-blue-50 dark:text-indigo-50 dark:text-purple-50 dark:text-pink-50",
  "dark:text-gray-100 dark:text-red-100 dark:text-yellow-100 dark:text-green-100 dark:text-blue-100 dark:text-indigo-100 dark:text-purple-100 dark:text-pink-100",
  "ring-gray-600 ring-red-600 ring-yellow-600 ring-green-600 ring-blue-600 ring-indigo-600 ring-purple-600 ring-pink-600",
  "dark:from-gray-900 dark:from-red-900 dark:from-yellow-900 dark:from-green-900 dark:from-blue-900 dark:from-indigo-900 dark:from-purple-900 dark:from-pink-900",
  "text-gray-700 text-red-700 text-yellow-700 text-green-700 text-blue-700 text-indigo-700 text-purple-700 text-pink-700",
  "dark:text-gray-200 dark:text-red-200 dark:text-yellow-200 dark:text-green-200 dark:text-blue-200 dark:text-indigo-200 dark:text-purple-200 dark:text-pink-200",
  "text-gray-600 text-red-600 text-yellow-600 text-green-600 text-blue-600 text-indigo-600 text-purple-600 text-pink-600",
  "dark:text-gray-400 dark:text-red-400 dark:text-yellow-400 dark:text-green-400 dark:text-blue-400 dark:text-indigo-400 dark:text-purple-400 dark:text-pink-400",
  "border-gray-700 border-red-700 border-yellow-700 border-green-700 border-blue-700 border-indigo-700 border-purple-700 border-pink-700",
  "dark:border-gray-400 dark:border-red-400 dark:border-yellow-400 dark:border-green-400 dark:border-blue-400 dark:border-indigo-400 dark:border-purple-400 dark:border-pink-400",
];

export function twIncludeAllColors(
  strings: TemplateStringsArray,
  baseColor: string
): string {
  const [pre, suf] = strings;
  logMissingClasses(pre, suf);
  return pre + baseColor + suf;
}

export const twBaseColor =
  (twClassStr: string) =>
  ({ $baseColor }: { $baseColor?: string }) => {
    const baseColor = $baseColor ?? DEFAULT_COLOR;
    const [pre, suf] = twClassStr.split("$baseColor");
    logMissingClasses(pre, suf);
    return pre + baseColor + suf;
  };

function logMissingClasses(pre: string, suf: string) {
  if (process.env.NODE_ENV === "development") {
    const allTwClasses = allColors.map((color) => pre + color + suf);
    if (
      !includedTwClasses.some((cF) =>
        allTwClasses.every((cN) => cF.includes(cN))
      ) &&
      !allMissingClasses.some((cF) =>
        allTwClasses.every((cN) => cF.includes(cN))
      )
    ) {
      allMissingClasses.push(allTwClasses.join(" "));
      console.error(
        "Please add this to the includedTwClasses",
        allMissingClasses
      );
    }
  }
}
