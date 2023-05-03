import { axiosInstance } from "../../contexts/AxiosContext";
import { CategoryModel, CreatePostRequest, PostModel } from "./models/PostModel";

export async function GetPosts(): Promise<PostModel[]>{
    const resposta = await axiosInstance.get('/post');
    return resposta.data; 
}

export async function GetCategories(): Promise<CategoryModel[]> {
    const response = await axiosInstance.get('/categories');
    return response.data; 
}


export async function CreatePost(post: CreatePostRequest): Promise<PostModel>{
    const response = await axiosInstance.post('/post', post);
    return response.data;
}