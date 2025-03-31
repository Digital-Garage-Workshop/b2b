import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

export const GetCartProducts =({config}:{config?:AxiosRequestConfig})=>{
    return axiosClient.get("/user/basket",config)
}