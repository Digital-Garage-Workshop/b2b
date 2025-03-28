import { axiosClient } from "@/utils";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function Faqs({ config, body }: Prop) {
  return axiosClient.get(`/faqs`, config);
}
