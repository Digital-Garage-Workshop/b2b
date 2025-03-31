import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

export const GetKhoroo =({config, body}:{config?:AxiosRequestConfig, body?:any})=>{
    const { locationid } = body
    return axiosClient.get(`/location/teamname?locationid=${locationid}`,config)
}