import React from "react";

const items=[ {
            desc:"Vacaciones",
            saldo:"125$",
            id:1
        }
]



const Eventos=()=>{
    return(
        <>
        
            <div className="grid md:grid-cols-3 gap-5 mx-2">
                
                {items.map((items, index)=>(
                    
                    <div className="bg-[#1C6E8C] rounded-xl p-2 text-center font-sans " key={items.id}>
                        <h3 className="text-[#e8eef2] font-thin font-light ">Descripción</h3>
                        <h2 className="text-[#e8eef2] font-xl">{items.desc}</h2>
                        <h3 className="text-[#e8eef2] font-thin font-light">Saldo</h3>
                        <h2 className="text-[#e8eef2] font-lg ">{items.saldo}</h2>
                    </div>

                ))}

            </div>
        
        </>
    )
}

export default Eventos