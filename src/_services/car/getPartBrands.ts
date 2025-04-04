import { axiosClient } from "@/utils"

type Prop = {
    body?:any
}
export const GetPartBrands =({body}:Prop)=>{
    return axiosClient.get(`part/partbrands`)
}