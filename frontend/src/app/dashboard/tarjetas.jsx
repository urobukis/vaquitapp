import Link from "next/link";
import React, { useEffect, useState } from "react";

const items=[ {
            desc:"Vacaciones",
            saldo:"125$",
            id:1
        }
]

const Tarjetas=({items})=>{
    
    
    const [total, setTotal]=useState()
    useEffect(() => {
    if (items.spending.length > 0) {
      const cost = items.spending.reduce((acc, item) => acc + item.amount, 0);
      setTotal(cost);
    } else {
      setTotal(0);
    }
  }, [items.spending]);
    
    return(
        <div className="bg-container rounded-xl p-4 w-80 text-center font-sans flex flex-col gap-2" key={items.id}>
            <div>
                <h3 className="text-[#e8eef2] font-thin  ">Descripción</h3>
                <h2 className="text-[#e8eef2] font-xl">{items.title}</h2>
            </div>
            <div>
                <h3 className="text-[#e8eef2] font-thin">Gastos totales</h3>
                <h2 className="text-[#e8eef2] font-lg ">{items.spending.length > 0 ? total : "$0.00" }</h2>
            </div>   
            <Link href={`/dashboard/${items.id}`} className="bg-details p-2 rounded-xl cursor-pointer">Ver grupo</Link>
        </div>
    )
}

export default Tarjetas