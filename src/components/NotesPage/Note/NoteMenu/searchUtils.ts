export function includesAll(keywords: string, inputValue: string) {
  const keywordsLower = keywords.toLocaleLowerCase();
  const inputValueArray = inputValue.toLocaleLowerCase().split(" ");
  return inputValueArray.every((inputWord) =>
    keywordsLower.includes(inputWord)
  );
}

export function countStartWith(keywords: string, inputValue: string) {
  const keywordsArray = keywords.toLocaleLowerCase().split(" ");
  const inputValueArray = inputValue.toLocaleLowerCase().split(" ");
  return inputValueArray.filter((inputWord) =>
    keywordsArray.some((keyword) => keyword.startsWith(inputWord))
  ).length;
}
