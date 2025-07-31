'use client'

import { useCookies } from "react-cookie"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Lista from "./listaDeintegrantes"

export default function pagina2() {



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
                        <button className="text-[#e8eef2]">USer</button>
                    </div>
                    
            </div>

        {/* informacion*/}
            <div className="bg-gray-300 md:col-span-10">
                <div className="md:flex sm:flex-nowrap">
                    {/* Datos de la pagina*/}
                    <div className="md:w-1/2 sm:w-1 md:text-left text-center">
                        <p className="md:text-left md:pl-30 mt-5">Añadir Evento</p>
                    </div>
                    {/* AddEevento*/}
                    <div className="md:w-1/2 sm:w-1 md:text-right text-center md:pr-18 mt-5"> <button className="bg-[#F3B447] p-2 rounded-full">+Add Event</button>
                    </div>
                    </div>
                    {/**/}
                    <div className="bg-[#274156] p-5 ">
                            <div className="grid grid-cols-1 text-center">
                                <form  action="" method="post">
                                <label className="font-sm text-lg font-thin text-[#e8eef2]" htmlFor="descripcion" >Descripción</label><br></br>
                                <input className="bg-[#e8eef2]" type="text" id="descripcion" name="descripcion"></input><br></br><br></br>
                                
                                <label className="font-sm text-lg font-thin text-[#e8eef2]" htmlFor="monto" >Monto</label><br></br>
                                <input className="bg-[#e8eef2]" type="number" id="monto" name="monto"></input><br></br><br></br>

                                <label className="font-sm text-lg font-thin text-[#e8eef2]" htmlFor="fecha" >Fecha</label><br></br>
                                <input className="bg-[#e8eef2]" type="date" id="fecha" name="fecha"></input><br></br><br></br>

                                <label className="font-sm text-lg font-thin text-[#e8eef2]" htmlFor="qpago" >Quien pago</label><br></br>
                                <input className="bg-[#e8eef2]" type="text" id="qpago" name="qpago"></input><br></br><br></br>
                                <br></br>

                                <h2 className="text-[#e8eef2]">Para quien es el gasto</h2>
                                <Lista/>
                                    <br></br>
                                    <br></br>
                                <input className="text-[#37393a] bg-[#F3B447] p-3 rounded-xl" type="submit" value="Submit"></input>
                                </form>
                            </div>
                            
                    </div>   
                </div>  
                {/* bandeja*/}

            
                  
                
                
            </div>
        </>
    )
 }