import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios";

type Prop = {
    config?: AxiosRequestConfig,
    body?:any,
    params?:any
}

export const Register =({ body }:Prop)=>{
    return axiosClient.post('/register', body)
}