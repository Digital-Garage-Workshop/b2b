import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function SuitableCarModel({ config, body }: Prop) {
  const { articleId, manuid } = body;
  return axiosClient.get(
    `/part/comfortable/carmodel?articleid=${articleId}&manuid=${manuid}`,
    config
  );
}
