export interface ApiResponse<T> {
    data?: T;
    error?: string;
}

export interface ContactUsFormPayload {
    id?: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    ai_response?: string;
}