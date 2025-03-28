import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function GetPartDetail({ config, body }: Prop) {
    const {articleid}= body;
    const queryparams = {'articleid':articleid}
  return axiosClient.get(`/part/detail`, {
    params:queryparams,
    ...config
  });
}