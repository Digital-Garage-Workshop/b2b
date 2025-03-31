import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

export const GetUserAddresses =({config}:{config?:AxiosRequestConfig})=>{
    return axiosClient.get("/user/address",config)
}