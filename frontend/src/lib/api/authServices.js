import { create } from "zustand";
import axios from "axios";
import { Cookies } from "react-cookie";


const cookies = new Cookies()

const api = axios.create({
    baseURL: "https://vaquitapp.onrender.com",
    withCredentials: true
})

api.interceptors.request.use((config)=>{
    const token = cookies.get("access_token")

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

let isRefreshing = false;
let queue = []

const processQueue = (error, token = null)=>{
    queue.forEach(({resolve, reject})=>{
        error ? reject(error) : resolve(token)
    });
    queue=[];
}

api.interceptors.response.use(
    (res)=> res,
    async (e) =>{
        const originalRequest = e.config;
        if(
            (e.response?.status === 401 || e.response?.status === 403) &&
            !originalRequest._retry
        ){
            if(isRefreshing){
                return new Promise((resolve, reject)=>{
                    queue.push({resolve, reject})
                }).then((token)=>{
                    originalRequest.headers.Authorization=`Bearer ${token}`
                    return api(originalRequest)
                })
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try{
                const res = await axios.post(
                    "https://vaquitapp.onrender.com/auth/refresh",
                    {},
                    {withCredentials: true}
                )
                const newToken = res.data.token;
                cookies.set("access_token", newToken, {
                    path: "/",
                    secure: false,
                    sameSite: "strict",
                    maxAge:3600
                })

                processQueue(null, newToken)
                originalRequest.headers.Authorization = `Bearer ${newToken}`
                return api(originalRequest)
            }catch (error){
                processQueue(error, null)
                return Promise.reject(error)
            }finally{
                isRefreshing = false
            }
        }
        return Promise.reject(e)
    }
)

export const useStore = create((set)=>({
    groups:[],
    registerUser: async(data)=>{
        await api.post("/auth/register", data)
    },
    loginUser: async(data)=>{
        const res = await api.post("/auth/login", data)
        console.log(res.data);
        
        const name = res.data.name
        const image = res.data.image
        const id = res.data.id
        const token = res.data.token.token

        cookies.set("access_token", token, {
            path: "/",
            secure: false,
            sameSite: "strict",
            maxAge: 3600,
        })
         cookies.set("name", name, {
            path: "/",
            secure: false,
            sameSite: "strict",
        });
        cookies.set("image", image, {
            path: "/",
            secure: false,
            sameSite: "strict",
        });
        cookies.set("user_id", id, {
            path: "/",
            secure: false,
            sameSite: "strict",
        });
        return res
    },
    addGroup:async (data)=>{
        await api.post("/user/addGroup", data)
    },
    getMyGroups: async()=>{
        const res = await api.get("/groups")
        set({groups: res.data})
        
        return res.data
    },
    getGroup: async(data)=>{
        const res = await api.get(`/groups/${data}`)
        return res.data
    },
    getBalances: async(data)=>{
        const res = await api.get(`/spending/${data}/balances`)
        return res.data
    },
    addSpend: async(data, groupId, userId)=>{
        const res = await api.post(`/groups/addSpending?groupId=${groupId}&userId=${userId}`, data)
       
        return res.data
    },
    getUsersByName: async(data)=>{
        const res = await api.get(`/user/search?name=${data}`)
        
        
        return res.data.map(user => ({
            label: user.name,
            value: user.id
        }))
    },
    addUserAnon: async(data, groupId)=>{
        const res = await api.post(`/groups/addUserAnon?groupId=${groupId}`, data)
        return res.data;
    },
    addMember: async(groupId, userId)=>{
        const res = await api.post(`/groups/addMember?groupId=${groupId}&userId=${userId}`)
        console.log(res.data);
        
        return res.data;
    }

}))