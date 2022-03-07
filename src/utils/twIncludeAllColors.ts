/**
  TODO: Write some good docs about this
 */

export type TwColor =
  | "black"
  | "white"
  | "rose"
  | "pink"
  | "fuchsia"
  | "purple"
  | "violet"
  | "indigo"
  | "blue"
  | "sky"
  | "cyan"
  | "teal"
  | "emerald"
  | "green"
  | "lime"
  | "yellow"
  | "amber"
  | "orange"
  | "red"
  | "warmGray"
  | "trueGray"
  | "gray"
  | "coolGray"
  | "blueGray";

export const allColors: TwColor[] = [
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
  "dark:ring-black-600 dark:ring-white-600 dark:ring-rose-600 dark:ring-pink-600 dark:ring-fuchsia-600 dark:ring-purple-600 dark:ring-violet-600 dark:ring-indigo-600 dark:ring-blue-600 dark:ring-sky-600 dark:ring-cyan-600 dark:ring-teal-600 dark:ring-emerald-600 dark:ring-green-600 dark:ring-lime-600 dark:ring-yellow-600 dark:ring-amber-600 dark:ring-orange-600 dark:ring-red-600 dark:ring-warmGray-600 dark:ring-trueGray-600 dark:ring-gray-600 dark:ring-coolGray-600 dark:ring-blueGray-600",
  "focus:ring-black-300 focus:ring-white-300 focus:ring-rose-300 focus:ring-pink-300 focus:ring-fuchsia-300 focus:ring-purple-300 focus:ring-violet-300 focus:ring-indigo-300 focus:ring-blue-300 focus:ring-sky-300 focus:ring-cyan-300 focus:ring-teal-300 focus:ring-emerald-300 focus:ring-green-300 focus:ring-lime-300 focus:ring-yellow-300 focus:ring-amber-300 focus:ring-orange-300 focus:ring-red-300 focus:ring-warmGray-300 focus:ring-trueGray-300 focus:ring-gray-300 focus:ring-coolGray-300 focus:ring-blueGray-300",
  "text-black-800 text-white-800 text-rose-800 text-pink-800 text-fuchsia-800 text-purple-800 text-violet-800 text-indigo-800 text-blue-800 text-sky-800 text-cyan-800 text-teal-800 text-emerald-800 text-green-800 text-lime-800 text-yellow-800 text-amber-800 text-orange-800 text-red-800 text-warmGray-800 text-trueGray-800 text-gray-800 text-coolGray-800 text-blueGray-800",
  "bg-black-50 bg-white-50 bg-rose-50 bg-pink-50 bg-fuchsia-50 bg-purple-50 bg-violet-50 bg-indigo-50 bg-blue-50 bg-sky-50 bg-cyan-50 bg-teal-50 bg-emerald-50 bg-green-50 bg-lime-50 bg-yellow-50 bg-amber-50 bg-orange-50 bg-red-50 bg-warmGray-50 bg-trueGray-50 bg-gray-50 bg-coolGray-50 bg-blueGray-50",
  "x-to-black-50 x-to-white-50 x-to-rose-50 x-to-pink-50 x-to-fuchsia-50 x-to-purple-50 x-to-violet-50 x-to-indigo-50 x-to-blue-50 x-to-sky-50 x-to-cyan-50 x-to-teal-50 x-to-emerald-50 x-to-green-50 x-to-lime-50 x-to-yellow-50 x-to-amber-50 x-to-orange-50 x-to-red-50 x-to-warmGray-50 x-to-trueGray-50 x-to-gray-50 x-to-coolGray-50 x-to-blueGray-50",
  "bg-black-100 bg-white-100 bg-rose-100 bg-pink-100 bg-fuchsia-100 bg-purple-100 bg-violet-100 bg-indigo-100 bg-blue-100 bg-sky-100 bg-cyan-100 bg-teal-100 bg-emerald-100 bg-green-100 bg-lime-100 bg-yellow-100 bg-amber-100 bg-orange-100 bg-red-100 bg-warmGray-100 bg-trueGray-100 bg-gray-100 bg-coolGray-100 bg-blueGray-100",
  "from-black-50 from-white-50 from-rose-50 from-pink-50 from-fuchsia-50 from-purple-50 from-violet-50 from-indigo-50 from-blue-50 from-sky-50 from-cyan-50 from-teal-50 from-emerald-50 from-green-50 from-lime-50 from-yellow-50 from-amber-50 from-orange-50 from-red-50 from-warmGray-50 from-trueGray-50 from-gray-50 from-coolGray-50 from-blueGray-50",
  "to-black-100 to-white-100 to-rose-100 to-pink-100 to-fuchsia-100 to-purple-100 to-violet-100 to-indigo-100 to-blue-100 to-sky-100 to-cyan-100 to-teal-100 to-emerald-100 to-green-100 to-lime-100 to-yellow-100 to-amber-100 to-orange-100 to-red-100 to-warmGray-100 to-trueGray-100 to-gray-100 to-coolGray-100 to-blueGray-100",
  "x-from-black-50 x-from-white-50 x-from-rose-50 x-from-pink-50 x-from-fuchsia-50 x-from-purple-50 x-from-violet-50 x-from-indigo-50 x-from-blue-50 x-from-sky-50 x-from-cyan-50 x-from-teal-50 x-from-emerald-50 x-from-green-50 x-from-lime-50 x-from-yellow-50 x-from-amber-50 x-from-orange-50 x-from-red-50 x-from-warmGray-50 x-from-trueGray-50 x-from-gray-50 x-from-coolGray-50 x-from-blueGray-50",
  "to-black-500 to-white-500 to-rose-500 to-pink-500 to-fuchsia-500 to-purple-500 to-violet-500 to-indigo-500 to-blue-500 to-sky-500 to-cyan-500 to-teal-500 to-emerald-500 to-green-500 to-lime-500 to-yellow-500 to-amber-500 to-orange-500 to-red-500 to-warmGray-500 to-trueGray-500 to-gray-500 to-coolGray-500 to-blueGray-500",
  "border-black-200 border-white-200 border-rose-200 border-pink-200 border-fuchsia-200 border-purple-200 border-violet-200 border-indigo-200 border-blue-200 border-sky-200 border-cyan-200 border-teal-200 border-emerald-200 border-green-200 border-lime-200 border-yellow-200 border-amber-200 border-orange-200 border-red-200 border-warmGray-200 border-trueGray-200 border-gray-200 border-coolGray-200 border-blueGray-200",
  "x-from-black-50 x-from-white-50 x-from-rose-50 x-from-pink-50 x-from-fuchsia-50 x-from-purple-50 x-from-violet-50 x-from-indigo-50 x-from-blue-50 x-from-sky-50 x-from-cyan-50 x-from-teal-50 x-from-emerald-50 x-from-green-50 x-from-lime-50 x-from-yellow-50 x-from-amber-50 x-from-orange-50 x-from-red-50 x-from-warmGray-50 x-from-trueGray-50 x-from-gray-50 x-from-coolGray-50 x-from-blueGray-50",
  "to-black-500 to-white-500 to-rose-500 to-pink-500 to-fuchsia-500 to-purple-500 to-violet-500 to-indigo-500 to-blue-500 to-sky-500 to-cyan-500 to-teal-500 to-emerald-500 to-green-500 to-lime-500 to-yellow-500 to-amber-500 to-orange-500 to-red-500 to-warmGray-500 to-trueGray-500 to-gray-500 to-coolGray-500 to-blueGray-500",
  "border-black-200 border-white-200 border-rose-200 border-pink-200 border-fuchsia-200 border-purple-200 border-violet-200 border-indigo-200 border-blue-200 border-sky-200 border-cyan-200 border-teal-200 border-emerald-200 border-green-200 border-lime-200 border-yellow-200 border-amber-200 border-orange-200 border-red-200 border-warmGray-200 border-trueGray-200 border-gray-200 border-coolGray-200 border-blueGray-200",
  "border-black-500 border-white-500 border-rose-500 border-pink-500 border-fuchsia-500 border-purple-500 border-violet-500 border-indigo-500 border-blue-500 border-sky-500 border-cyan-500 border-teal-500 border-emerald-500 border-green-500 border-lime-500 border-yellow-500 border-amber-500 border-orange-500 border-red-500 border-warmGray-500 border-trueGray-500 border-gray-500 border-coolGray-500 border-blueGray-500",
  "border-black-300 border-white-300 border-rose-300 border-pink-300 border-fuchsia-300 border-purple-300 border-violet-300 border-indigo-300 border-blue-300 border-sky-300 border-cyan-300 border-teal-300 border-emerald-300 border-green-300 border-lime-300 border-yellow-300 border-amber-300 border-orange-300 border-red-300 border-warmGray-300 border-trueGray-300 border-gray-300 border-coolGray-300 border-blueGray-300",
];

export function twIncludeAllColors(
  strings: TemplateStringsArray,
  baseColor: TwColor
): string {
  const [pre, suf] = strings;
  logMissingClasses(pre, suf);
  return pre + baseColor + suf;
}

export const twBaseColor =
  (twClassStr: string) =>
  ({ $baseColor }: { $baseColor: TwColor }) => {
    const baseColor = $baseColor;
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
