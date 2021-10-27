export function getLocalStorageItem<T>(key: string): T | null {
  try {
    const loadedItem = localStorage.getItem(key);
    if (loadedItem) {
      return JSON.parse(loadedItem) as T;
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function setLocalStorageItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
