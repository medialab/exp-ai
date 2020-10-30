import react, { useEffect } from "react"; /* eslint no-unused-vars : 0 */

export function useDebounce(fn, values, delay) {
  useEffect(() => {
    const handler = setTimeout(fn, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [delay, fn, ...values]); /* eslint react-hooks/exhaustive-deps : 0 */
}
