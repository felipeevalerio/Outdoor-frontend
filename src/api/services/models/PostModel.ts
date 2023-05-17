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

export interface PostDetailsModel extends PostModel {
    comments: CommentModel[]
}

export interface CommentModel {
    id: string;
    image: string;
    review: string;
    rating: number;
    createdAt: string;
    userId: string;
    postId: string;
}

export interface CommentRequestModel {
    image: any;
    review: string;
    rating: number;
    userId: string;
    postId: string;
}

export type CreatePostRequest = CreatePostFormInputs;

export interface CategoryModel {
    id: string;
    name: string;
}