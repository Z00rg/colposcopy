import { useRouter } from "next/router";


export function TryDetailPage() {
  const router = useRouter();
  const { tryId } = router.query;
  console.log(`Открыта страница попытки с id ${tryId}`);
  return (
        <div className="flex flex-col items-center min-h-screen lg:min-h-[667px]">
            </div>
      );
}