'use client'

import { useStore } from "@/lib/api/authServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function login(){
    const loginUser = useStore((state)=>state.loginUser)
    const {register, handleSubmit} = useForm()

    const router = useRouter()


    const registerNavigation = ()=>{
        router.push("/auth/register")
    }

    const onSubmit =async (data) =>{
        await loginUser(data)
        .then(()=>router.push("/dashboard"))
    }
    
    return(
         <section className="flex items-center justify-center h-screen bg-dark-purple font-inter">
            <div className="flex flex-col items-center gap-4 bg-[#274156] rounded-3xl p-8 text-platinum">
                <h2 className="font-medium text-2xl">Vaquitapp</h2>
                <div className="bg-gray-300 p-2 rounded-[20px]">
                <button className=" bg-[#1C6E8C] w-[200px] p-2 rounded-xl ">
                    Entrar
                </button>
                <button className="w-[200px] p-2 text-black cursor-pointer" onClick={registerNavigation}>
                    Crear cuenta
                </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    placeholder="tu@email.com"
                    className="placeholder:text-gray-500 p-2 focus:outline-dark-cyan focus:outline-2 rounded-xl border border-dark-cyan"
                    {...register("email")}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="pass">Contraseña</label>
                    <input
                    type="password"
                    id="pass"
                    placeholder="*****"
                    className="placeholder:text-gray-500 p-2 focus:outline-dark-cyan focus:outline-2 rounded-xl border border-dark-cyan"
                    {...register("password")}
                    />
                </div>
                <button className="w-full p-2 bg-[#1C6E8C] rounded-xl" >Entrar</button>
                </form>
            </div>
        </section>
    )
}