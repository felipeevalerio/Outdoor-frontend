export interface RegisterRequest {
    name: string;
    password: string;
    email: string;
    userType: 'client' | 'provider';
}