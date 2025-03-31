import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

type Prop = {
    config?:AxiosRequestConfig,
    body?:any,
    params?:any
}

export const DeleteUserAddress =({config, body}:Prop)=>{    
    const { addressid } = body
    return axiosClient.post(`/user/address/remove`,body, config)
}