import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

export const GetOrders =({config, body}:{config?:AxiosRequestConfig, body?:any})=>{
    return axiosClient.get(`/user/purchase`,config)
}
