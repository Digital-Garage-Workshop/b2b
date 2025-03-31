import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

type Prop = {
    config?:AxiosRequestConfig,
    body?:any,
    params?:any
}

export const UpdateAddress =({config, body}:Prop)=>{    
    const { addressid } = body
    return axiosClient.post(`/user/address/update/${addressid}`,body, config)
}