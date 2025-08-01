'use client'

import { useCookies } from "react-cookie"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { useGroupCache } from "@/hooks/useGroupCache"
import { useFormatNumber } from "@/hooks/useFormatNumber"
import Select from "react-select"
import { useForm } from "react-hook-form"
import { useStore } from "@/lib/api/authServices"
import { useBalancesCache } from "@/hooks/useBalancesCache"

const AnadirGasto=({params})=> {
    const {register, handleSubmit, formState={errors}}=useForm()
    const addSpend = useStore((state)=>state.addSpend)
    
    const [userSelected, setUserSelected]=useState([])
    const param = use(params)
    const router = useRouter()
    const {refetch:balanceRefetch} = useBalancesCache(param.groupId)
    const {data, isLoading , refetch}= useGroupCache(param.groupId);
    console.log(data);
    
    const options = data?.members.map((item)=>({
            value: item.name,
            label:item.name,
            userId: item.id
        }));
    
        
        
        const onSubmit= async(data)=>{
            const {description, amount }=data

            const newData = {
                description,
                amount,
            }

            await addSpend(newData, param.groupId, userSelected.userId )
            .then(()=>router.replace(`/dashboard/${param.groupId}`))
            
            await refetch()
            await balanceRefetch()
            
        }
    const handleUserOptions = (selected)=>{
        setUserSelected(selected)
    }

    

    return(
        <>
            <div className="w-full flex items-center bg-background justify-center">
    
                <div className=" md:col-span-10 w-1/2">
                    <div className="bg-container p-5 rounded-xl w-full">
                        <div className="flex flex-col items-center gap-4 w-full">
                            <p className="font-bold">Detalles del gasto</p>
                            <form  className="flex flex-col gap-3 w-full" onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col">
                                    <label className="font-sm text-lg font-thin text-[#e8eef2]" htmlFor="descripcion" >Descripción</label>
                                    <input className="bg-[#e8eef2] p-2 rounded-xl placeholder:text-gray-400 text-gray-600" type="text" id="descripcion" placeholder="Escribe una descripcion..." 
                                    {...register("description", {required: true, minLength: 3})}></input>
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-sm text-lg font-thin text-[#e8eef2]" htmlFor="monto"  >Monto</label>
                                    <input className="bg-[#e8eef2] p-2 rounded-xl placeholder:text-gray-400 text-gray-600" placeholder="Escribe un monto.." type="number" id="monto" n
                                    {...register("amount", {required:true})}></input>
                                </div>
                                <div className="flex flex-col">
                                <label className="text-[#e8eef2]" htmlFor="name">Quien realizó el gasto?</label>
                                {
                                    !isLoading && <Select options={options}  id="name" classNamePrefix="select" styles={{
                                        control: (base, state) => ({
                                        ...base,
                                        borderColor: state.isFocused ? "#1a181b" : "#ccc",
                                        borderRadius: 12,
                                        boxShadow: state.isFocused ? "0 0 0 1px #1a181b" : "none",
                                        "&:hover": {
                                            borderColor: "#1a181b",
                                        },
                                        }),
                                        option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isFocused ? "#1a181b" : "white",
                                        color: state.isFocused ? "white" : "black",
                                        cursor: "pointer",
                                        })
                                    }}
                                    onChange={handleUserOptions}
                                    />
                                }
                                </div>
                                <button className="bg-details p-3 rounded-xl cursor-pointer w-32 self-center" type="submit">Añadir</button>
                            </form>
                        </div>
                            
                    </div>   
                </div>  
                {/* bandeja*/}
            </div>
        </>
    )
 }

 export default AnadirGasto