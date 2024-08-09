import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import {
  MenuIcon,
  PackageIcon,
  LayoutDashboardIcon,
  KanbanIcon,
  TeamIcon,
  SettingsIcon,
  SearchIcon,
} from "@/components/icons";

export default function Nav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
            <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-muted text-muted-foreground text-lg font-semibold md:h-8 md:w-8 md:text-base"
            prefetch={false}
          >
            <PackageIcon className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Acme Inc</TooltipContent>
          </Tooltip>
          <Tooltip>
            {/* TODO: este item es el activo. En interactividad setear al active */}
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors duration-75 hover:bg-muted hover:border-2 hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <LayoutDashboardIcon className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <KanbanIcon className="h-5 w-5" />
                <span className="sr-only">Kanban</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Kanban</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <TeamIcon className="h-5 w-5" />
                <span className="sr-only">Team</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Team</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <SettingsIcon className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
