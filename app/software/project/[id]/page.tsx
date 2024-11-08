'use client'

import { lastPathFromURL } from "@/app/lib/utils";
import { useSearchParams, usePathname } from "next/navigation";
import Dashboard from "@/components/custom/Dashboard";
export default function Component() {

    const id = lastPathFromURL(usePathname())
    
    return (
        <Dashboard/>
    )
}