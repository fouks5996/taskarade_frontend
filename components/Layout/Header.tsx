import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <div
      className={
        "flex justify-center px-[10%] py-6 items-center bg-white w-full "
      }
    >
      <div className={"flex justify-between w-full"}>
        <p> logo</p>
        <div>
          {session ? (
            <button
              onClick={() =>
                signOut({ callbackUrl: "http://localhost:3000/auth/sign-in" })
              }
            >
              Sign out
            </button>
          ) : (
            <div className={"flex items-center gap-5"}>
              <Link href="/auth/sign-in">
                <button>Sign In</button>
              </Link>
              <Link href="/auth/sign-up">
                <button>Sign Up</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
