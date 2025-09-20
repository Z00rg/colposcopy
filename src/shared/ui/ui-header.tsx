import clsx from "clsx";
import Image from "next/image";

type UiHeaderVariant = "logo" | "withoutLogo";

interface UiHeaderProps {
  className?: string;
  variant?: UiHeaderVariant;
}

export function UiHeader({ className, variant }: UiHeaderProps) {
  return (
    <header
      className={clsx(
        "flex items-center justify-center flex-col gap-16",
        className
      )}
    >
      {variant === "logo" && (
        <Image
          src="/logo.png" // Путь к изображению начинается с корневой папки public
          width={270}
          height={97}
          alt="Логотип приложения" // Альтернативный текст для доступности
        />
      )}
      <div className="text-4xl w-80 font-normal text-center">
        Цифровой атлас кольпоскопии
      </div>
    </header>
  );
}
