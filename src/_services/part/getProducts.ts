

import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function GetProducts({ config, body }: Prop) {
    const {categoryid, brandno, carid, page, maxprice,minprice }= body;
    const queryparams = {'categoryid':categoryid, 'carid':carid,'brandno':brandno, 'page':page,'max_price':maxprice,'min_price':minprice}
  return axiosClient.get(`/part`, {
    params:queryparams,
    ...config
  });
}