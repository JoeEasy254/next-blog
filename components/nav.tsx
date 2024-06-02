import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { BookOpenIcon, UserRoundIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Nav() {
  return (
    <div className="p-3 bg-gray-50 mx-auto w-[650px]">
      <div className="flex justify-between items-center">
        <div>
          <ul>
            <li>
              <Link href="/">
                <BookOpenIcon />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="flex flex-row space-x-4 items-center">
            <li>
              <Link href="/authors">
                <UserRoundIcon />
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-2">
          <SignedIn>
            <UserButton />
            <Link href="/write">
              <Button>write</Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <Button>
              <SignInButton mode="modal" />
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
