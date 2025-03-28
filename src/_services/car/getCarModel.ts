import { axiosClient } from "@/utils"

type Prop = {
    body?:any
}

export const GetCarModel =({body}:Prop)=>{
    const { manuid } = body
    return axiosClient.get(`/car/carmodel/${manuid}`)
}