import { cn } from "../lib/utils";




const QuatrefoilPattern = ({
  className,
  // default keeps the original brand pattern so existing usages stay the same
  image = "/ig-classic-assets/bg-pattern.svg",
}: {
  className?: string;
  image?: string;
}) => (
  <div
    aria-hidden
    style={{ backgroundImage: `url('${image}')` }}
    className={cn(
      "pointer-events-none  absolute inset-0 -z-10 bg-repeat",
      className,
    )}
  />
);

export default QuatrefoilPattern;
