export function UiVideoPlayer({
  src,
  poster,
  title = "Видео",
  className,
}: {
  src: string;
  poster: string;
  title?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <video
        controls
        preload="metadata"
        playsInline
        poster={poster}
        aria-label={title}
        className="w-full max-h-[35svh] rounded-lg"
      >
        <source src={src} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
    </div>
  );
}