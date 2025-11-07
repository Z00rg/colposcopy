import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef } from "react";

type UiScrollImgProps = {
  img: string[];
  className?: string;
  onIndexChange?: (index: number) => void;
};

const IMAGE_WIDTH = 300;

export function UiScrollImg({
  img,
  className,
  onIndexChange,
}: UiScrollImgProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const scrollLeft = scrollContainerRef.current.scrollLeft;

    const newIndex = Math.round(scrollLeft / IMAGE_WIDTH);

    const clampedIndex = Math.min(Math.max(0, newIndex), img.length - 1);

    if (onIndexChange) {
      onIndexChange(clampedIndex);
    }
  };

  // Сброс скролла при смене изображений
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [img]);

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className={clsx(
        className,
        "flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden scrollbar-hide",
        "w-[300px] h-[345px] items-center rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
      )}
    >
      {img.map((src, index) => (
        <div key={"img " + index} className="flex-shrink-0 snap-center">
          <Image
            src={src}
            alt={`Image ${index + 1}`}
            width={IMAGE_WIDTH}
            height={345}
          />
        </div>
      ))}
    </div>
  );
}
