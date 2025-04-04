import { axiosClient } from "@/utils"

export const VerifyEmail = ({body}:{body?:any})=>{
    const { token } = body;
    return axiosClient.get(`verify-email/${token}`)
}