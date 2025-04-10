

import { axiosClient } from "@/utils"

export const ResendVerify = ({body}:{body?:any})=>{
    const { email } = body;
    return axiosClient.post(`/verify-email/resend`, body)
}