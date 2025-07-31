'use client'

import { useCookies } from "react-cookie"
import Tarjetas from "./tarjetas"
import { useEffect } from "react"
import { useRouter } from "next/navigation"


export default function dashboard() {

{/* 
        const [cookies] = useCookies(["name"])

    const router = useRouter()
    useEffect(()=>{
        if(!cookies.name){
            router.replace("/auth/login")
        }
    }, [])
    
    
    
    */}
    

    return(
        <>
        {/* panel laterial y de navegacion*/}
            <div className="grid md:grid-cols-12 gap-8 ">
                
                <div className="bg-[#F3B447] md:col-span-2 min-h-100 text-center">
                    <p className="pt-8 pb-5">Vaquita</p>
                    <div>
                        <ul className="list-none pt-10">
                            <li><a href="/dashboard">Dashboard</a></li>
                            <li><a href="/crearevento">Detalle</a></li>
                            <li><a href="">Configuracion</a></li>
                        </ul> 
                    </div>

                    <div className="mt-30 flex flex-wrap flex-gap-10 bg-[#37393a]"> 
                        <button className="text-[#e8eef2]">USER</button>
                    </div>
                    
            </div>

        {/* informacion*/}
            <div className="bg-gray-300 md:col-span-10">
                <div className="md:flex sm:flex-nowrap">
                    {/* Datos de la pagina*/}
                    <div className="md:w-1/2 sm:w-1 md:text-left text-center">
                        <p className="md:text-left md:pl-30 mt-5">Dashboard</p>
                    </div>
                    {/* AddEevento*/}
                    <div className="md:w-1/2 sm:w-1 md:text-right text-center md:pr-18 mt-5"> <button className="bg-[#F3B447] p-2 rounded-full">+Add Event</button>
                    </div>
                    </div>

                    <div className="bg-[#274156] p-5">
                    <Tarjetas/>
                </div>   
                </div>  
                {/* bandeja*/}

            
                  
                
                
            </div>
        </>
    )
 }