import { useContext } from "react";
import { PostModel } from "../api/services/models/PostModel";
import { PostsContext } from "../contexts/PostsContext";
import { LoadingContext } from "../contexts/LoadingContext";
import { GetAllCitiesFromUF } from "../api/geolocation/geolocation-api";

export function usePosts() {
    const { posts, categories, states } = useContext(PostsContext);
    const { handleLoadingVisibility } = useContext(LoadingContext);

    function sendMessageToProvider(post: PostModel) {
        const message = `Olá ${post.provider.name}, vi seu post no Outdoor e gostaria de realizar um orçamento do serviço ${post.title}`
        window.open(`https://wa.me/${post.contactNumber}?text=${message}`, '_blank')
    }

    function filterPosts(categoryId: string | null, city: string | null, state: string | null) {
        if (categoryId || city || state) {
            return posts.filter(post => post.categoryId === categoryId || post.city.toLowerCase() === city?.toLowerCase() || state === post.state);
        }

        return posts;
    }
    
    async function getCitiesByUF(uf: string | null) {
        if (!uf) {
            return;
        }

        handleLoadingVisibility(true)
        const cities = await GetAllCitiesFromUF(uf);
        handleLoadingVisibility(false)
        return cities;
    }

    return {
        posts,
        states,
        categories,
        sendMessageToProvider,
        filterPosts,
        getCitiesByUF
    }
}