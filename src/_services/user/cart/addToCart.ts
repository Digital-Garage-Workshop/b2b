import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from 'axios';

type Prop = {
    config?:AxiosRequestConfig,
    body?:any,
    params?:any
}

export const AddToCart =({body, config}:Prop)=>{
    return axiosClient.post('/user/basket/add', body, config)
}