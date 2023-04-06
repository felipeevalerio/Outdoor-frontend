import { useCallback, useEffect, useState } from "react";
import { PostModel } from "../api/services/models/PostModel";
import { GetPosts } from "../api/services/post-api";

export function usePosts() {
    const [posts, setPosts] = useState<PostModel[]>([]);

    const getAllPosts = useCallback(async () => {
        const response = await GetPosts(); 
        setPosts(response);
    }, []);

    function sendMessageToProvider(post: PostModel) {
        const message = `Olá ${post.provider.name}, vi seu post no Outdoor e gostaria de realizar um orçamento do serviço ${post.title}`
        window.open(`https://wa.me/${post.contactNumber}?text=${message}`, '_blank')
    }

    return {
        posts,
        sendMessageToProvider,
        getAllPosts
    }
}