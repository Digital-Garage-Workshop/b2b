import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

export const GetTerminal =({config, body}:{config?:AxiosRequestConfig, body?:any})=>{
    return axiosClient.get(`/location/terminalname`,config)
}