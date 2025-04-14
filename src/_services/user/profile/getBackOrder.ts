import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

export const GetBackOrders =({config, body}:{config?:AxiosRequestConfig, body?:any})=>{
    return axiosClient.get(`/user/backorder`,config)
}
