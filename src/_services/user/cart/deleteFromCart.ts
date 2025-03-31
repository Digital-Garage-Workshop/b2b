import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

type Prop = {
    config?:AxiosRequestConfig,
    body?:any,
    params?:any
}


export const DeleteFromCart =({config, body}:Prop)=>{    
    return axiosClient.post(`/user/basket/remove`,body, config)
}