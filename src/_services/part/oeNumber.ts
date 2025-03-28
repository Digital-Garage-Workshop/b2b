import { axiosClient } from "@/utils/api";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function OemNumber({ config, body }: Prop) {
  const { articleid } = body;
  return axiosClient.get(
    `part/oemnumber?articleid=${articleid}`,
    config
  );
}