import Image from "next/image";

export type Feature = { icon: string; label: string };

const Features = ({ features }: { features: Feature[] }) => (
  <ul className="grid grid-cols-3 rounded-2xl border border-primary py-3">
    {features.map(({ icon, label }) => (
      <li
        key={label}
        className="not-first:divider-fade-y flex flex-col items-center gap-1.5 px-2 text-center"
      >
        <span className="flex size-9 items-center justify-center rounded-full border border-primary ">
          <Image
            src={icon}
            alt=""
            width={30}
            height={30}
            className="size-6 sm:size-7 object-contain "
          />
        </span>
        <span className="whitespace-pre-line text-[10px] sm:text-xs font-bold leading-tight text-black   ">
          {label}
        </span>
      </li>
    ))}
  </ul>
);

export default Features;
