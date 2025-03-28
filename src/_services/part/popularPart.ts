import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export const PopularPart =({ config, body }: Prop)=>{
    return axiosClient.get('/part/popular', config)
}