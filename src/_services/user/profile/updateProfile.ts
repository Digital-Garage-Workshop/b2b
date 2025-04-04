import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

type Prop = {
    config?:AxiosRequestConfig,
    body?:any,
    params?:any
}

export const UpdateProfile =({config, body}:Prop)=>{
    return axiosClient.post("/user/profile/update", body, config)
}