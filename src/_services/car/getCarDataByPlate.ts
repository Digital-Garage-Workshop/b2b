import { axiosClient } from "@/utils"

type Prop = {
    body?:any
}

export const GetCarByPlate =({body}:Prop)=>{
    const { platenumber } = body
    return axiosClient.get(`/car/plate?platenumber=${platenumber}`)
}