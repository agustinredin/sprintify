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

export default function Header() {

  const router = useRouter()

  const handleLogout = async () => {
    await deleteUserSession()
     router.push('/signup')
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:pl-20 sm:static sm:py-4 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <NavSheet />
      <div className="flex justify-between flex-1 items-center">
        <div>
          <h1 className="hidden md:block text-3xl font-bold tracking-tight text-accent">
            Sprintify
          </h1>
          <span className="sr-only">Sprintify</span>
        </div>
        <div className="flex items-center relative ml-auto flex-1 md:grow-0">
          <SearchIcon className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
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
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Notifications</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem  onClick={() => handleLogout()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
