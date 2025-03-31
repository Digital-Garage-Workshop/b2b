import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

type Prop = {
    config?:AxiosRequestConfig,
    body?:any,
    params?:any
}

export const AddUserAddress =({config, body}:Prop)=>{    
    return axiosClient.post(`/user/address/add`,body, config)
}