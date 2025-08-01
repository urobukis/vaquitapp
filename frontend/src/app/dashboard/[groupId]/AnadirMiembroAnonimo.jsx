import { useStore } from '@/lib/api/authServices';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';

const AnadirMiembroAnonimo = ({groupId, anadirMiembro, setAnadirMiembro, refetchBalance, refetchGroup}) => {
    const addUserAnon = useStore((state)=>state.addUserAnon)
    const {register, handleSubmit} = useForm()
    const route = useRouter()
    const onSubmit =async (data)=>{
        await addUserAnon(data, groupId)
        .then(()=>route.push(`/dashboard/${groupId}`))
        .then(()=>setAnadirMiembro(!anadirMiembro))
        
        await refetchBalance()
        await refetchGroup()
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 items-center w-full'>
        <input className="bg-[#e8eef2] w-full p-2 rounded-xl placeholder:text-gray-400 text-gray-600" placeholder="Escribe el nombre..." {...register("name", {required:true, minLength: 3})}/>
        <button className="bg-details p-2 rounded-xl cursor-pointer w-fit" type='submit'>Añadir</button>
    </form>
  )
}

export default AnadirMiembroAnonimo