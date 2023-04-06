import { UserModel } from "../../user/models/UserModel";

export interface PostModel {
    id: string;
    title: string;
    category: string;
    state: string;
    district: string;
    city: string;
    contactNumber: string;
    description: string;
    image: string;
    rating: number;
    createdAt: Date;
    provider: UserModel;
}