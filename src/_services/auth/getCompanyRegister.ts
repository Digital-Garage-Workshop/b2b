import { axiosClient } from "@/utils";
import {  AxiosRequestConfig } from "axios"

type Prop ={
    config?:AxiosRequestConfig,
    body?:any;
    params?:any
}
export const GetCompanyRegister =({ body}:Prop)=>{
    const { regnumber } = body
return axiosClient.get('/companyregister', { params:{'regnumber':regnumber}},)
}