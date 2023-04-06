import { useCallback, useContext, useEffect, useState } from "react";
import { PostModel } from "../api/services/models/PostModel";
import { GetPosts } from "../api/services/post-api";
import { LoadingContext } from "../contexts/LoadingContext";
import { PostsContext } from "../contexts/PostsContext";

export function usePosts() {
    const { posts, categories } = useContext(PostsContext);

    function sendMessageToProvider(post: PostModel) {
        const message = `Olá ${post.provider.name}, vi seu post no Outdoor e gostaria de realizar um orçamento do serviço ${post.title}`
        window.open(`https://wa.me/${post.contactNumber}?text=${message}`, '_blank')
    }

    return {
        posts,
        categories,
        sendMessageToProvider,
    }
}