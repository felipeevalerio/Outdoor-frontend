import { axiosInstance } from "../../contexts/AxiosContext";
import { EditPostRequest } from "../../hooks/usePosts";
import { CategoryModel, CommentRequestModel, CreatePostRequest, PostModel } from "./models/PostModel";

export async function GetPosts(): Promise<PostModel[]>{
    const response = await axiosInstance.get('/post');
    return response.data; 
}

export async function GetCategories(): Promise<CategoryModel[]> {
    const response = await axiosInstance.get('/categories');
    return response.data; 
}

export async function CreatePost(post: CreatePostRequest): Promise<PostModel>{
    const response = await axiosInstance.post('/post', post);
    return response.data;
}

export async function EditPost(post: EditPostRequest): Promise<PostModel>{
    const response = await axiosInstance.put('/post', post);
    return response.data;
}

export async function GetPostsFromUser(userId: string) {
    const response = await axiosInstance.get(`/users/posts?ID=${userId}`);
    return response.data;
}

export async function DeletePost(postId: string) {
    const response = await axiosInstance.delete(`/post?postId=${postId}`);
    return response.data;
}

export async function InsertCommentInPost(request: CommentRequestModel) {
    await axiosInstance.get('/consumer');
    const response = await axiosInstance.post(`/comment`, request);
    return response.data;
}

export async function GetPostById(postId: string) {
    const response = await axiosInstance.get(`/post/${postId}`); 
    return response.data;
}