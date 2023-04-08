import { useContext } from "react";
import { PostModel } from "../api/services/models/PostModel";
import { PostsContext } from "../contexts/PostsContext";

export function usePosts() {
    const { posts, categories, cities } = useContext(PostsContext);

    function sendMessageToProvider(post: PostModel) {
        const message = `Olá ${post.provider.name}, vi seu post no Outdoor e gostaria de realizar um orçamento do serviço ${post.title}`
        window.open(`https://wa.me/${post.contactNumber}?text=${message}`, '_blank')
    }

    function filterPosts(categoryId: string | null, city: string | null) {
        if (categoryId || city) {
            return posts.filter(post => post.categoryId === categoryId || post.city.toLowerCase() === city?.toLowerCase());
        }

        return posts;
    }

    return {
        posts,
        cities,
        categories,
        sendMessageToProvider,
        filterPosts
    }
}