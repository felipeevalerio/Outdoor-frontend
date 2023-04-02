export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    createdAt: string;
    userType: 'client' | 'provider'
}