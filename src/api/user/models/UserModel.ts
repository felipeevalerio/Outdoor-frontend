export interface UserModel {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    createdAt: string;
    userType: 'client' | 'provider'
}