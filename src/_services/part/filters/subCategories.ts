import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function GetSubCategories({ config, body }: Prop) {
    const {categoryid}= body;
    const queryparams = {'categoryid':categoryid}
  return axiosClient.get(`/subcategory`, {
    params:queryparams,
    ...config
  });
}