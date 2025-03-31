

import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

export const GetPuchaseDetail =({config, body}:{config?:AxiosRequestConfig, body?:any})=>{
    const { purchaseid } = body
    return axiosClient.get(`user/purchase/detail/${purchaseid}`,config)
}