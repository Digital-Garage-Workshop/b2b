import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

type Prop = {
    config?:AxiosRequestConfig,
    body?:any,
    params?:any
}

export const EmptyCart = ({config}:Prop)=>{
    return axiosClient.get('/user/basket/clear', config)
}