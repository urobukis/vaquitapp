'use client'

import { useRouter } from "next/navigation"

import { useEffect } from "react"
import { useCookies } from "react-cookie"
import Tarjetas from "./tarjetas"
import { useGroupsCache } from "@/hooks/useGroupsCache"
import { useStore } from "@/lib/api/authServices"



const Dashboard=()=> {
    const [cookies]=useCookies(["name"])
    const groups = useStore((state)=>state.groups)
    const router = useRouter()

   
    
    useEffect(()=>{
            if(!cookies.name){
                router.replace("/auth/login")
            }
    }, [])

    const {data, isLoading}= useGroupsCache()
    const handleAddGroup=()=>{
        router.push("/dashboard/crearGrupo")
    }

    return(
        <>
            <div className="w-full gap-8 ">
        {/* informacion*/}
                <div className="bg-gray-300 ">
                    <div className="md:flex items-center justify-around p-2 sm:flex-nowrap">
                        {/* Datos de la pagina*/}
                        <p className="text-details">Dashboard</p>
                        {/* AddEevento*/}
                        <button className="bg-details p-2 rounded-full cursor-pointer" onClick={handleAddGroup}>
                            + Añadir Grupo
                        </button>
                    </div>
                    <div className="bg-background p-5 flex gap-2">
                        {
                            groups.length > 0 && groups.map((item)=>(
                                <Tarjetas key={item.id} items={item}/>
                            ))
                        }
                    </div>  
                </div>  
                {/* bandeja*/}
            </div>
        </>
    )
 }

 export default Dashboard;