'use client'
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  MenuIcon,
  PackageIcon,
  LayoutDashboardIcon,
  KanbanIcon,
  TeamIcon,
  SettingsIcon,
  SearchIcon,
  SprintifyIcon,
} from "@/components/ui/icons";
import NavSheet from "./NavSheet";
import { deleteUserSession } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Check if there is a previous history entry
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleLogout = async () => {
    await deleteUserSession();
    router.push('/signup');
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:px-12 sm:static sm:py-4 sm:h-auto sm:border-0 sm:bg-transparent">
      <NavSheet />
      <div className="flex justify-between flex-1 items-center">
        <Link href='/software'>
          <h1 className="hidden md:block text-3xl font-bold tracking-tight text-accent">
            Sprintify
          </h1>
          <span className="sr-only">Sprintify</span>
        </Link>
        {/* {canGoBack && (
          <div className="mr-auto ml-8 flex-1 md:grow-0">
            <div
              className="flex items-center cursor-pointer w-24"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground grow pl-2">Go Back</span>
            </div>
          </div>
        )} */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src="/placeholder.svg"
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
              style={{ aspectRatio: "36/36", objectFit: "cover" }}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleLogout()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
