/**
 * TODO: Write some good docs about this
 */

import { DEFAULT_COLOR } from "../config";

const allColors = [
  "black",
  "white",
  "rose",
  "pink",
  "fuchsia",
  "purple",
  "violet",
  "indigo",
  "blue",
  "sky",
  "cyan",
  "teal",
  "emerald",
  "green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "red",
  "warmGray",
  "trueGray",
  "gray",
  "coolGray",
  "blueGray",
];

let allMissingClasses: string[] = [];
const includedTwClasses: string[] = [
  "to-black-50 to-white-50 to-rose-50 to-pink-50 to-fuchsia-50 to-purple-50 to-violet-50 to-indigo-50 to-blue-50 to-sky-50 to-cyan-50 to-teal-50 to-emerald-50 to-green-50 to-lime-50 to-yellow-50 to-amber-50 to-orange-50 to-red-50 to-warmGray-50 to-trueGray-50 to-gray-50 to-coolGray-50 to-blueGray-50",
  "dark:to-black-900 dark:to-white-900 dark:to-rose-900 dark:to-pink-900 dark:to-fuchsia-900 dark:to-purple-900 dark:to-violet-900 dark:to-indigo-900 dark:to-blue-900 dark:to-sky-900 dark:to-cyan-900 dark:to-teal-900 dark:to-emerald-900 dark:to-green-900 dark:to-lime-900 dark:to-yellow-900 dark:to-amber-900 dark:to-orange-900 dark:to-red-900 dark:to-warmGray-900 dark:to-trueGray-900 dark:to-gray-900 dark:to-coolGray-900 dark:to-blueGray-900",
  "text-black-900 text-white-900 text-rose-900 text-pink-900 text-fuchsia-900 text-purple-900 text-violet-900 text-indigo-900 text-blue-900 text-sky-900 text-cyan-900 text-teal-900 text-emerald-900 text-green-900 text-lime-900 text-yellow-900 text-amber-900 text-orange-900 text-red-900 text-warmGray-900 text-trueGray-900 text-gray-900 text-coolGray-900 text-blueGray-900",
  "dark:text-black-100 dark:text-white-100 dark:text-rose-100 dark:text-pink-100 dark:text-fuchsia-100 dark:text-purple-100 dark:text-violet-100 dark:text-indigo-100 dark:text-blue-100 dark:text-sky-100 dark:text-cyan-100 dark:text-teal-100 dark:text-emerald-100 dark:text-green-100 dark:text-lime-100 dark:text-yellow-100 dark:text-amber-100 dark:text-orange-100 dark:text-red-100 dark:text-warmGray-100 dark:text-trueGray-100 dark:text-gray-100 dark:text-coolGray-100 dark:text-blueGray-100",
  "ring-black-600 ring-white-600 ring-rose-600 ring-pink-600 ring-fuchsia-600 ring-purple-600 ring-violet-600 ring-indigo-600 ring-blue-600 ring-sky-600 ring-cyan-600 ring-teal-600 ring-emerald-600 ring-green-600 ring-lime-600 ring-yellow-600 ring-amber-600 ring-orange-600 ring-red-600 ring-warmGray-600 ring-trueGray-600 ring-gray-600 ring-coolGray-600 ring-blueGray-600",
  "dark:from-black-900 dark:from-white-900 dark:from-rose-900 dark:from-pink-900 dark:from-fuchsia-900 dark:from-purple-900 dark:from-violet-900 dark:from-indigo-900 dark:from-blue-900 dark:from-sky-900 dark:from-cyan-900 dark:from-teal-900 dark:from-emerald-900 dark:from-green-900 dark:from-lime-900 dark:from-yellow-900 dark:from-amber-900 dark:from-orange-900 dark:from-red-900 dark:from-warmGray-900 dark:from-trueGray-900 dark:from-gray-900 dark:from-coolGray-900 dark:from-blueGray-900",
  "border-black-700 border-white-700 border-rose-700 border-pink-700 border-fuchsia-700 border-purple-700 border-violet-700 border-indigo-700 border-blue-700 border-sky-700 border-cyan-700 border-teal-700 border-emerald-700 border-green-700 border-lime-700 border-yellow-700 border-amber-700 border-orange-700 border-red-700 border-warmGray-700 border-trueGray-700 border-gray-700 border-coolGray-700 border-blueGray-700",
  "dark:border-black-400 dark:border-white-400 dark:border-rose-400 dark:border-pink-400 dark:border-fuchsia-400 dark:border-purple-400 dark:border-violet-400 dark:border-indigo-400 dark:border-blue-400 dark:border-sky-400 dark:border-cyan-400 dark:border-teal-400 dark:border-emerald-400 dark:border-green-400 dark:border-lime-400 dark:border-yellow-400 dark:border-amber-400 dark:border-orange-400 dark:border-red-400 dark:border-warmGray-400 dark:border-trueGray-400 dark:border-gray-400 dark:border-coolGray-400 dark:border-blueGray-400",
  "text-black-700 text-white-700 text-rose-700 text-pink-700 text-fuchsia-700 text-purple-700 text-violet-700 text-indigo-700 text-blue-700 text-sky-700 text-cyan-700 text-teal-700 text-emerald-700 text-green-700 text-lime-700 text-yellow-700 text-amber-700 text-orange-700 text-red-700 text-warmGray-700 text-trueGray-700 text-gray-700 text-coolGray-700 text-blueGray-700",
  "dark:text-black-200 dark:text-white-200 dark:text-rose-200 dark:text-pink-200 dark:text-fuchsia-200 dark:text-purple-200 dark:text-violet-200 dark:text-indigo-200 dark:text-blue-200 dark:text-sky-200 dark:text-cyan-200 dark:text-teal-200 dark:text-emerald-200 dark:text-green-200 dark:text-lime-200 dark:text-yellow-200 dark:text-amber-200 dark:text-orange-200 dark:text-red-200 dark:text-warmGray-200 dark:text-trueGray-200 dark:text-gray-200 dark:text-coolGray-200 dark:text-blueGray-200",
  "text-black-600 text-white-600 text-rose-600 text-pink-600 text-fuchsia-600 text-purple-600 text-violet-600 text-indigo-600 text-blue-600 text-sky-600 text-cyan-600 text-teal-600 text-emerald-600 text-green-600 text-lime-600 text-yellow-600 text-amber-600 text-orange-600 text-red-600 text-warmGray-600 text-trueGray-600 text-gray-600 text-coolGray-600 text-blueGray-600",
  "dark:text-black-400 dark:text-white-400 dark:text-rose-400 dark:text-pink-400 dark:text-fuchsia-400 dark:text-purple-400 dark:text-violet-400 dark:text-indigo-400 dark:text-blue-400 dark:text-sky-400 dark:text-cyan-400 dark:text-teal-400 dark:text-emerald-400 dark:text-green-400 dark:text-lime-400 dark:text-yellow-400 dark:text-amber-400 dark:text-orange-400 dark:text-red-400 dark:text-warmGray-400 dark:text-trueGray-400 dark:text-gray-400 dark:text-coolGray-400 dark:text-blueGray-400",
  "dark:text-black-50 dark:text-white-50 dark:text-rose-50 dark:text-pink-50 dark:text-fuchsia-50 dark:text-purple-50 dark:text-violet-50 dark:text-indigo-50 dark:text-blue-50 dark:text-sky-50 dark:text-cyan-50 dark:text-teal-50 dark:text-emerald-50 dark:text-green-50 dark:text-lime-50 dark:text-yellow-50 dark:text-amber-50 dark:text-orange-50 dark:text-red-50 dark:text-warmGray-50 dark:text-trueGray-50 dark:text-gray-50 dark:text-coolGray-50 dark:text-blueGray-50",
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
