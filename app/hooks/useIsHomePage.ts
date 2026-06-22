import { usePathname } from "next/navigation";

// true when the current route is the home page, shared so pages do not
// each re-derive the same pathname check
export function useIsHomePage() {
  return usePathname() === "/";
}
