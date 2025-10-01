import clsx from "clsx";
import Image from "next/image";

type UiScrollImgProps = {
  img: string[];
  className?: string;
}

export function UiScrollImg({ img, className }: UiScrollImgProps) {
  return (
    <div
      className={clsx(
        className,
        "flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden gap-4 scrollbar-hide",
        "w-[300px] h-[345px] items-center rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
      )}
    >
      {img.map((src, index) => (
        <div key={"img " + index} className="flex-shrink-0 snap-center">
          <Image
            src={src}
            alt={`Image ${index + 1}`}
            width={300}
            height={345}
          />
        </div>
      ))}
    </div>
  );
}