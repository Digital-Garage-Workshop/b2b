export interface LoginResponse {
    success: boolean;
    data: {
        name: string | null;
        email: string | null;
        phone: number | null;
        token: string;
        expires_in: number;
        image_url:string|null
        id:string|null
    };
    message: string;
}