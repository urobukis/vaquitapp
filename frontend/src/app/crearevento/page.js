'use client'

import { useCookies } from "react-cookie"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Lista from "./listaDeintegrantes"

export default function pagina2() {



    return(
        <>
            <div className="w-full gap-8 ">
        {/* informacion*/}
                <div className="bg-gray-300 md:col-span-10">
                    <div className="md:flex justify-around p-4 items-center sm:flex-nowrap">
                        {/* Datos de la pagina*/}
                        <p className="">Añadir Evento</p>
                        {/* AddEevento*/}
                        <button className="bg-details p-2 rounded-full">+Add Event</button>
                    </div>
                    {/**/}
                    <div className="bg-background p-5 ">
                        <div className="grid grid-cols-1 text-center">
                            <form  action="" method="post">
                                <label className="font-sm text-lg font-thin text-[#e8eef2]" htmlFor="descripcion" >Descripción</label>
                                <input className="bg-[#e8eef2]" type="text" id="descripcion" name="descripcion"></input>
                                <label className="font-sm text-lg font-thin text-[#e8eef2]" htmlFor="monto" >Monto</label>
                                <input className="bg-[#e8eef2]" type="number" id="monto" name="monto"></input>
                                <label className="font-sm text-lg font-thin text-[#e8eef2]" htmlFor="fecha" >Fecha</label>
                                <input className="bg-[#e8eef2]" type="date" id="fecha" name="fecha"></input>
                                <label className="font-sm text-lg font-thin text-[#e8eef2]" htmlFor="qpago" >Quien pago</label>
                                <input className="bg-[#e8eef2]" type="text" id="qpago" name="qpago"></input>
                                <h2 className="text-[#e8eef2]">Para quien es el gasto</h2>
                                <Lista/>
                                <input className="text-[#37393a] bg-details p-3 rounded-xl" type="submit" value="Submit"></input>
                            </form>
                        </div>
                            
                    </div>   
                </div>  
                {/* bandeja*/}
            </div>
        </>
    )
 }