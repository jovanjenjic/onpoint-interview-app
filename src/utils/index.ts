/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 *  Debounce function to delay the execution of a function
 * @param func The function to be debounced
 * @param delay The delay duration in milliseconds
 * @param callback Optional callback function to be executed before debouncing
 * @returns
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T, // The function to be debounced
  delay: number, // The delay duration in milliseconds
  callback?: () => void, // Optional callback function to be executed before debouncing
) => {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    callback?.();
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// Check if two arrays are deeply equal
export function isEqual<T>(array1: T[], array2: T[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (!deepEqual(array1[i], array2[i])) {
      return false;
    }
  }

  return true;
}

// Deep equality comparison for objects
function deepEqual(object1: any, object2: any): boolean {
  if (object1 === object2) {
    return true;
  }

  if (
    typeof object1 !== 'object' ||
    object1 === null ||
    typeof object2 !== 'object' ||
    object2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(object1[key], object2[key])) {
      return false;
    }
  }

  return true;
}
