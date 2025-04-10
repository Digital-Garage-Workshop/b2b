import { axiosClient } from "@/utils"
import { AxiosRequestConfig } from "axios"

type Prop = {
    config?: AxiosRequestConfig,
    body?: any,
    params?: any
}

export const ExcelImport = ({config, body}: Prop) => {
    let requestConfig = {
        ...config
    };
    
    if (body instanceof FormData) {
        console.log('ExcelImport: FormData detected, configuring request properly');
        
        requestConfig = {
            ...requestConfig,
            headers: {
                ...requestConfig?.headers,
            },
            transformRequest: undefined
        };
        
        const freshFormData = new FormData();
        for (let pair of body.entries()) {
            freshFormData.append(pair[0], pair[1]);
            console.log(`Adding to fresh FormData: ${pair[0]}`, pair[1]);
        }
        
        return axiosClient.post(
            `/user/excel/oemimport`, 
            freshFormData,  
            requestConfig
        );
    }
    
    return axiosClient.post(`/user/excel/oemimport`, body, requestConfig);
};