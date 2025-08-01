import { useBalancesCache } from '@/hooks/useBalancesCache'
import { useStore } from '@/lib/api/authServices'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import AnadirMiembroAnonimo from './AnadirMiembroAnonimo'
import { useRouter } from 'next/navigation'

const AnadirMiembro = ({groupId, anadirMiembro, setAnadirMiembro, refetchBalance, refetchGroup}) => {
    const { handleSubmit}=useForm()
    const [selectedUser, setSelectedUser]=useState()
    const [anadirManualmente, setAnadirManualmente]=useState(false)
    const router = useRouter()
    const getUsersByName = useStore((state)=>state.getUsersByName)
    const addMember = useStore((state)=>state.addMember)
    const {data:balances, isLoading: balancesLoading} = useBalancesCache(groupId)

    const loadOptions = async (inputValue) => {
        const results = await getUsersByName(inputValue)
        const members = balances.map((user)=>user.name );
        
        
        return results.filter((user)=> !members.includes(user.label))
        
        
    }

    const handleChangeUser = (selected)=>{
        setSelectedUser(selected)
    }

    const onSubmit =async ()=>{
        await addMember(groupId, selectedUser.value)
        .then(()=>router.push(`/dashboard/${groupId}`))
        
        setAnadirMiembro(false)
        await refetchBalance()
        await refetchGroup()
        
    }

    

  return (
        <div className="top-0 bottom-0 right-0 left-0 absolute m-auto bg-container w-1/4 h-fit p-4 flex flex-col rounded-2xl gap-4 items-center">
            <p>Busca un usuario</p>
            <form className='w-full flex flex-col items-center gap-3' onSubmit={handleSubmit(onSubmit)}>
                <AsyncSelect cacheOptions loadOptions={loadOptions}  placeholder="Busca usuario.." className="bg-[#e8eef2] w-full p-2 rounded-xl placeholder:text-gray-400 text-gray-600" onChange={handleChangeUser}/>
            
        {
            selectedUser && <button className="bg-details p-2 rounded-xl cursor-pointer">Añadir </button>

        }
            </form>
            <p>ó</p>
            {
                anadirManualmente ? 
                    <AnadirMiembroAnonimo groupId={groupId} anadirMiembro={anadirMiembro} setAnadirMiembro={setAnadirMiembro} refetchBalance={refetchBalance} refetchGroup={refetchGroup}/>
                    : <button className="bg-details p-2 rounded-xl cursor-pointer" onClick={()=>setAnadirManualmente(!anadirManualmente)}>Añadir manualmente</button>
            }     
            <button className='absolute right-4 bg-red-600 rounded-full h-4 w-4 flex items-center justify-center' onClick={()=>setAnadirMiembro(false)}>x</button>   
        </div>
  )
}

export default AnadirMiembro