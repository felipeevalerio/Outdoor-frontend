import { CreatePostFormInputs } from "../../../pages/Services/components/CreatePostModal";
import { UserModel } from "../../user/models/UserModel";

export interface PostModel {
    id: string;
    title: string;
    categoryId: string;
    state: string;
    district: string;
    city: string;
    contactNumber: string;
    description: string;
    image: string;
    rating: number;
    createdAt: Date;
    user: UserModel;
}


export type CreatePostRequest = CreatePostFormInputs;

export interface CategoryModel {
    id: string;
    name: string;
}