import { axiosClient } from "@/utils"

type Prop = {
    body?:any
}

export const GetCarEngine =({body}:Prop)=>{
    const { manuid, modelid } = body
    return axiosClient.get(`car/carengine/${manuid}/${modelid}`)
}