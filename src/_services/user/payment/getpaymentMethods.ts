import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

export const GetPaymentMethod =({config, body}:{config?:AxiosRequestConfig, body?:any})=>{
    const { purchaseid } = body;
    return axiosClient.get(`/payment?purchaseid=${purchaseid}`,config)
}
