import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function GetPriceFilter({ config, body }: Prop) {
    const {categoryid, carid}= body;
    const queryparams = {'categoryid':categoryid, 'carid':carid}
  return axiosClient.get(`/part/pricefilter`, {
    params:queryparams,
    ...config
  });
}