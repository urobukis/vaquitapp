'use client'


import { use, useEffect, useState } from "react";import Image from "next/image";
import { useGroupCache } from "@/hooks/useGroupCache";
import { useBalancesCache } from "@/hooks/useBalancesCache";
import { useCurrency } from "@/hooks/useCurrency";
import Link from "next/link";
import AsyncSelect from "react-select/async"
import { useStore } from "@/lib/api/authServices";
import AnadirMiembro from "./AnadirMiembro";

const Group=({params})=>{
    const [anadirMiembro, setAnadirMiembro]=useState(false)

    const {formatCurrency}=useCurrency()
    
    const {groupId}=use(params)
    
    const {data,isLoading, refetch: groupRefetch}=useGroupCache(groupId)
    
    const {data:balances, isLoading: balancesLoading, refetch: balanceRefetch} = useBalancesCache(groupId)
    console.log(balances);
    
   
    useEffect(()=>{

    },[])
    

    const handleAñadirMiembro = ()=>{

    }

   return(
    <section className={`bg-background w-full flex items-center justify-center p-5 relative`}>
        <div className={`bg-container w-3/4 p-4 rounded-xl ${anadirMiembro ? "blur-2xl" : "blur-none"}`}>
            {
                !isLoading &&
                <div className="flex flex-col gap-4 items-center">
                    <h3 className="text-3xl">{data.title}</h3>
                    <div className="flex gap-3">
                        {data.members.map((item, index)=>(
                            <div key={index} className="bg-other flex flex-col p-2 w-fit rounded-xl">
                               <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                    
                        {
                            !balancesLoading &&
                            <div className="flex gap-4 flex-wrap justify-center">
                                {
                                    balances.map((item, index)=>(
                                        <div key={index} className="flex flex-col bg-background p-4 items-center rounded-lg gap-4 w-56">
                                            <p className="font-semibold text-lg underline">Estado</p>
                                            <div className="flex flex-col gap-3 w-full">
                                                <p className="text-center">{item.name}</p>
                                                <div className="flex flex-col  ">
                                                    <div className="flex justify-between">
                                                        <p>Gastos totales: </p>
                                                        <p className="text-green-400 font-bold">{formatCurrency(item.totalExpenses)}</p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p>Balance: </p>
                                                        <p className={`${item.balance >= 0 ? "text-green-400 " : "text-red-600"} font-semibold`}>{formatCurrency(item.balance)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    <div className="flex justify-center">
                        <button  className="bg-details p-2 rounded-lg cursor-pointer" onClick={()=>setAnadirMiembro(!anadirMiembro)}>Añadir miembro</button>
                    </div>
                    <div className="flex flex-col w-full p-10 gap-2">
                        <h3 className="self-start text-2xl">Gastos</h3>
                        <div className="flex flex-col gap-2">
                            {
                                data.spending.length > 0 ?
                                data.spending.map((item, index)=>(
                                    <div key={index} className="flex items-center justify-between bg-background p-4 rounded-2xl">
                                        <div>
                                        <p>{item.description}</p>
                                        <p>Hecho por: {item.userId.name}</p>
                                        </div>
                                        <p className="font-bold">{formatCurrency(item.amount)}</p>
                                    </div>
                                    
                                ))
                                : <p>Sin gastos</p>
                            }
                        </div>
                        <div className="flex justify-center">
                            <Link href={`/dashboard/${groupId}/anadirGasto`} className="bg-details p-2 rounded-lg cursor-pointer" >Añadir gasto</Link>
                        </div>
                    </div>
                </div>
            }
            
        </div>
        {
            anadirMiembro && <AnadirMiembro groupId={groupId} anadirMiembro={anadirMiembro} setAnadirMiembro={setAnadirMiembro} refetchBalance={balanceRefetch} refetchGroup={groupRefetch}/>
        }
    </section>
   )
    
}

export default Group