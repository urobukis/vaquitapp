'use client'

import React from 'react'
import { useCookies } from 'react-cookie'

const Panel = () => {
    const [cookies] = useCookies(["name"])
  return (
    <div className="bg-details p-2 min-w-80 text-center">
        <p className="pt-8 pb-5">Vaquita</p>
        <div>
            <ul className="list-none pt-10">
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/crearevento">Detalle</a></li>
                <li><a href="">Configuracion</a></li>
            </ul> 
        </div>
        <div className="mt-30 flex flex-wrap flex-gap-10 bg-[#37393a]"> 
            {/* Despues tendriamos que sacar el OR para usar solo cookies.name */}
            <button className="text-[#e8eef2]">{cookies.name || "User"}</button>
        </div>
    </div>
  )
}

export default Panel