import { useEffect, useState } from "react";

// tracks whether a css media query currently matches, kept in sync on resize.
// starts false so server render and first paint stay mobile, then resolves on
// mount. use it to drive js behaviour that has to match a tailwind breakpoint,
// eg "(min-width: 640px)" for sm and up.
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
