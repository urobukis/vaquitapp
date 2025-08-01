'use client'


import { useGroupsCache } from '@/hooks/useGroupsCache'
import { useStore } from '@/lib/api/authServices'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'


const CrearGrupo=()=>{
  const addGroup = useStore((state)=>state.addGroup)
  const {register, handleSubmit, formState:{errors}}= useForm()

  const router = useRouter()

  const {refetch}=useGroupsCache()

  const onSubmit =async (data)=>{
    console.log(data);
    
    await addGroup(data)
    .then(()=> router.push("/dashboard"))
    
    await refetch()
  }

  return (
    <section className='flex items-center justify-center bg-background w-full'>
      <form className='bg-container p-4 w-80 flex flex-col gap-6 rounded-xl' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2 items-center relative'>
          <label htmlFor='title' className='font-medium text-xl'>Título del grupo</label>
          <input placeholder='Escribe un titulo' id='title' className='border border-details rounded p-2 focus:border-red-600 focus:outline-red-600 focus:outline-1'{...register("title", {required:true, minLength: 3})}/>
          
          {
            errors.title && errors.title.type === "required" && 
            <p className="text-red-600 text-sm  absolute -bottom-5">*Este campo no puede estar vacio</p>
          }
          {
            errors.title && errors.title.type === "minLength" && 
            <p className="text-red-600 text-sm absolute -bottom-5">*Debes escribir un titulo mas largo</p>
          }
        </div>
        <button className='bg-details rounded-2xl p-2 cursor-pointer'>Añadir Grupo</button>
      </form>
    </section>
  )
}

export default CrearGrupo
