import { axiosClient } from "@/utils"

export const GetCarManu =()=>{
    return axiosClient.get(`/car/carbrand`)
}