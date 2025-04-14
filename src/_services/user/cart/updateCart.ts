import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

type Prop = {
    config?:AxiosRequestConfig,
    body?:any,
    params?:any
}


export const UpdateCart =({config, body}:Prop)=>{    
    return axiosClient.post(`/user/basket/update`,body, config)
}