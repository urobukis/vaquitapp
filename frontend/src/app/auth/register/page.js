'use client'

import { useStore } from "@/lib/api/authServices"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function register(){
    const {register, handleSubmit,setError,clearErrors,watch, formState:{errors}}=useForm()
    const registerUser = useStore((state)=>state.registerUser)

    const router = useRouter()

    const password = watch("password");
    const rePass = watch("rePass");

    const loginNavigation = ()=>{
        router.push("/auth/login")
    }

    useEffect(() => {
    if (password && rePass && rePass === password) {
      clearErrors("noMatch");
    }
  }, [password, rePass, clearErrors]);
    const onSubmit =async (data)=>{
        if(data.password !== data.rePass){
            setError("noMatch", {
                message: "Las contraseñas no coinciden"
            })
            return;
        }
        
        await registerUser(data)
        .then(()=>router.push("/auth/login"))
        
    }

    return(
         <section className="flex items-center justify-center h-screen bg-dark-purple font-inter">
            <div className="flex flex-col items-center gap-4 bg-[#274156] rounded-3xl p-8 text-platinum">
                <h2 className="font-medium text-2xl">Vaquitapp</h2>
                <div className="bg-gray-300 p-2 rounded-[20px]">
                    <button className="  w-[200px] p-2  cursor-pointer text-black" onClick={loginNavigation}>
                        Entrar
                    </button>
                    <button className=" w-[200px] p-2  rounded-xl focus:text-white  bg-[#1C6E8C]">Crear cuenta</button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col gap-2 relative">
                        <label htmlFor="name">Nombre</label>
                        <input
                        type="text"
                        id="name"
                        placeholder="Tu nombre"
                        className={`placeholder:text-gray-500 p-2  rounded-xl border  ${errors.name && "border-red-600 outline outline-red-600"}`}
                        {...register("name", {required: true, minLength: 3})}
                        
                        />
                    
                        {errors.name && errors.name.type === "required" &&
                        <p className="text-red-600 text-sm absolute -bottom-5">*Este campo no puede estar vacio</p>}
                        {errors.name && errors.name.type === "minLength" &&
                        <p className="text-red-600 text-sm absolute -bottom-5">*Debe tener al menos 3 caracteres</p>}
                    </div>
                    <div className="flex flex-col gap-2 relative">
                        <label htmlFor="email">Email</label>
                        <input
                        type="text"
                        id="email"
                        placeholder="tu@email.com"
                        className={`placeholder:text-gray-500 p-2  rounded-xl border  ${errors.email && "border-red-600 outline outline-red-600"}`}
                        {...register("email", {required:true, pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/})}
                        />
                        {errors.email && errors.email.type === "required" &&
                        <p className="text-red-600 text-sm absolute -bottom-5">*Este campo no puede estar vacio</p>}
                        {errors.email && errors.email.type === "pattern" &&
                        <p className="text-red-600 text-sm absolute -bottom-5">*Debes escribir un email valido</p>}
                    </div>
                    <div className="flex flex-col gap-2 relative">
                        <label htmlFor="pass">Contraseña</label>
                        <input
                        type="password"
                        id="pass"
                        placeholder="*****"
                        className={`placeholder:text-gray-500 p-2  rounded-xl border  ${errors.password || errors.noMatch && "border-red-600 outline outline-red-600"}`}
                        {...register("password", {required:true, minLength:8})}
                        />
                        {errors.password && errors.password.type === "required" &&
                        <p className="text-red-600 text-sm absolute -bottom-5">*Este campo no puede estar vacio</p>}
                        {
                        !errors.password && errors.noMatch && 
                        <p className="text-red-600 text-sm absolute -bottom-5">*{errors.noMatch.message}</p>
                        }
                        {errors.password && errors.password.type === "minLength" &&
                        <p className="text-red-600 text-sm absolute -bottom-5">*Debes escribir una contraseña de al menos 8 caracteres</p>}
                    </div>
                    <div className="flex flex-col gap-2 relative">
                        <label htmlFor="rePass">Repetir contraseña</label>
                        <input
                        type="password"
                        id="rePass"
                        placeholder="*****"
                        className={`placeholder:text-gray-500 p-2  rounded-xl border  ${errors.rePass || errors.noMatch && "border-red-600 outline outline-red-600"}`}
                        {...register("rePass", {required:true})}
                        />
                        {errors.rePass && errors.rePass.type === "required" &&
                        <p className="text-red-600 text-sm absolute -bottom-5">*Este campo no puede estar vacio</p>}
                        {
                        !errors.password && errors.noMatch && 
                        <p className="text-red-600 text-sm absolute -bottom-5">*{errors.noMatch.message}</p>
                        }
                    </div>
                    <button className="w-full p-2 bg-[#1C6E8C] rounded-xl" type="submit">Registrar</button>
                </form>
            </div>
        </section>
    )
}