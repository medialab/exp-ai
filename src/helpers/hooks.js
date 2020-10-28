import react, { useState, useEffect } from "react";

export function useDebounce(fn, values, delay) {
  // const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      fn();
      // setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [delay, ...values]);
  // return debouncedValue;
}
