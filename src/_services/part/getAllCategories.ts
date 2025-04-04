import { axiosClient } from "@/utils";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function GetAllCategories({ config, body }: Prop) {
  return axiosClient.get(`/allcategory`, config);
}
