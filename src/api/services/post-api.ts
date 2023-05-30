import { axiosBackendInstance } from "../../contexts/AxiosContext";
import { EditPostRequest } from "../../hooks/usePosts";
import { CategoryModel, CommentRequestModel, CreatePostRequest, PostModel } from "./models/PostModel";

export async function GetPosts(): Promise<PostModel[]>{
    const response = await axiosBackendInstance.get('/post');
    return response.data; 
}

export async function GetCategories(): Promise<CategoryModel[]> {
    const response = await axiosBackendInstance.get('/categories');
    return response.data; 
}

export async function CreatePost(post: CreatePostRequest): Promise<PostModel>{
    const response = await axiosBackendInstance.post('/post', post);
    return response.data;
}

export async function EditPost(post: EditPostRequest): Promise<PostModel>{
    const response = await axiosBackendInstance.put('/post', post);
    return response.data;
}

export async function GetPostsFromUser(userId: string) {
    const response = await axiosBackendInstance.get(`/users/posts?ID=${userId}`);
    return response.data;
}

export async function DeletePost(postId: string) {
    const response = await axiosBackendInstance.delete(`/post?postId=${postId}`);
    return response.data;
}

export async function InsertCommentInPost(request: CommentRequestModel) {
    const response = await axiosBackendInstance.post(`/comment`, request);
    return response.data;
}

export async function GetPostById(postId: string) {
    const response = await axiosBackendInstance.get(`/post/${postId}`); 
    return response.data;
}