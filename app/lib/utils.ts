import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class lists. `clsx` handles conditional/array inputs, then
 * `twMerge` resolves conflicts so the *last* class wins — e.g. a `className`
 * prop can override a component's base utilities without `!important`.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
