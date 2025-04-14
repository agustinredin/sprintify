"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Tooltip from "@/components/ui/tooltip"
import {
  MenuIcon,
  PackageIcon,
  LayoutDashboardIcon,
  KanbanIcon,
  TeamIcon,
  SettingsIcon,
  SearchIcon,
  SprintifyIcon,
} from "@/components/ui/icons"

const navItems: any[] = [
  // { href: "/software/project/1", icon: LayoutDashboardIcon, label: "Dashboard" },
  // { href: "/software/project/kanban", icon: KanbanIcon, label: "Kanban" },
  // { href: "/software/project/team", icon: TeamIcon, label: "Team" },
  // { href: "/software/settings", icon: SettingsIcon, label: "Settings" },
]

const baseClassName = "flex w-full h-16 items-center justify-center transition-colors duration-75"
const inactiveClassName = "text-muted-foreground hover:text-foreground"
const activeClassName =
  "bg-accent text-accent-foreground hover:bg-muted hover:border-2 hover:text-foreground cursor-auto"

export default function Nav() {
  const pathname = usePathname()

  return (
    null
    // <aside className='fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex'>
    //   <nav className='flex flex-col items-center'>
    //     <Tooltip content='Sprintify' side='right'>
    //       <Link
    //         href='/software'
    //         className='group flex h-16 w-16 shrink-0 items-center justify-center gap-2 rounded-full bg-muted text-muted-foreground text-lg font-semibold md:h-12 md:w-12 md:text-base my-4'
    //         prefetch={false}>
    //         <SprintifyIcon className='h-8 w-8 transition-all group-hover:scale-110' />
    //         <span className='sr-only'>Sprintify</span>
    //       </Link>
    //     </Tooltip>
    //     {navItems.map((item) => (
    //       <Tooltip key={item.href} content={item.label} side='right'>
    //         <Link
    //           href={item.href}
    //           className={`${baseClassName} ${pathname === item.href ? activeClassName : inactiveClassName}`}
    //           prefetch={false}>
    //           <item.icon className='h-6 w-6' />
    //           <span className='sr-only'>{item.label}</span>
    //         </Link>
    //       </Tooltip>
    //     ))}
    //   </nav>
    // </aside>
  )
}
