 
import React from "react"
    const Eventos=()=>{
           const grupo=[
        {id:"1",nombre:"Luis"},
        {id:"2",nombre:"Maria"},
        {id:"3",nombre:"José"}
        ]
    return(<>
    

            {grupo.map((items, index)=>(
                    
 
                        <form className="text-[#e8eef2] font-light" key={items.id}>
                            <label htmlFor="cbox">{items.nombre} </label>
                            <input name="cbox" id="cbox" type="checkbox" value={items.nombre}></input><br></br>
                        </form>


                ))}

    
    </>)
 }

 export default Eventos