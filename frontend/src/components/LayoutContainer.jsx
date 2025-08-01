'use client'

import { usePathname } from "next/navigation";
import Panel from "./Panel";

export default function LayoutContainer({children}){
    const pathname = usePathname()
    const panel = pathname.startsWith("/auth")

    return(
        !panel ? (
            <div className="flex min-h-screen">
                {!panel && <Panel />}
                {children}
            </div>
        ) 
        : (
            <div className="flex min-h-screen items-center justify-center">   
                {children}
            </div>
        )
        
        
    )

}