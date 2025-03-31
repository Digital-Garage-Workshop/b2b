
import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

export const GetProvince =({config, body}:{config?:AxiosRequestConfig, body?:any})=>{
    return axiosClient.get(`/location`,config)
}