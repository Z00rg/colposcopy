import { useSignOut } from "../model/use-sign-out";

export function SignOutButton() {
  const { signOut } = useSignOut();

  return (
    <button
      className="ml-auto text-rose-500 hover:text-rose-700 text-[20px] cursor-pointer"
      onClick={() => signOut({})}
    >
      Выйти из аккаунта
    </button>
  );
}
