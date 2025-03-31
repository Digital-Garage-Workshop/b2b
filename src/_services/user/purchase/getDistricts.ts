

import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

export const GetDistricts =({config, body}:{config?:AxiosRequestConfig, body?:any})=>{
    return axiosClient.get(`/location/districtname?locationid=1`,config)
}