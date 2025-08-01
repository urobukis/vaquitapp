'use client'


import { use } from "react";
import Image from "next/image";
import { useGroupCache } from "@/hooks/useGroupCache";

const Group=({params})=>{
    
    const {groupId}=use(params)
    
    const {data,isLoading}=useGroupCache(groupId)
    console.log(data);
    

   return(
    <section className="bg-background w-full flex items-center justify-center p-5">
        <div className="bg-container w-full p-4 rounded-xl">
            {
                !isLoading && 
                <div className="flex flex-col gap-4 items-center">
                    <h3 className="text-3xl">{data.title}</h3>
                    <div>
                        {data.members.map((item, index)=>(
                            <div key={index} className="bg-other flex flex-col p-2 w-fit rounded-xl">
                               <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col w-full p-10 gap-2">
                        <h3 className="self-start text-2xl">Gastos</h3>
                        <div className="flex flex-col gap-2">
                            {
                                data.spending.map((item, index)=>(
                                    <div key={index} className="flex items-center justify-between bg-background p-4 rounded-2xl">
                                        <div>
                                        <p>{item.description}</p>
                                        <p>Hecho por: {item.userId.name}</p>
                                        </div>
                                        <p>{item.amount}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
            
        </div>
    </section>
   )
    
}

export default Group