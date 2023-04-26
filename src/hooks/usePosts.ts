import { useContext } from "react";
import { PostModel } from "../api/services/models/PostModel";
import { PostsContext } from "../contexts/PostsContext";
import { LoadingContext } from "../contexts/LoadingContext";
import { GetAllCitiesFromUF } from "../api/geolocation/geolocation-api";
import { CreatePostFormInputs } from "../pages/Services/components/CreatePostModal";
import { CreatePost } from "../api/services/post-api";

export function usePosts() {
    const { posts, categories, states, insertNewPost} = useContext(PostsContext);
    const { handleLoadingVisibility } = useContext(LoadingContext);

    function sendMessageToProvider(post: PostModel) {
      if (post.user) {
        const message = `Olá ${post.user.name}, vi seu post no Outdoor e gostaria de realizar um orçamento do serviço ${post.title}`
        window.open(`https://wa.me/${post.contactNumber}?text=${message}`, '_blank')
      }
    }

    function filterPosts(categoryId: string | null, city: string | null, state: string | null) {
        return posts.reduce((filtered: PostModel[], post) => {
            if (categoryId && post.categoryId !== categoryId) {
              return filtered;
            }
            if (city && post.city !== city) {
              return filtered;
            }
            if (state && post.state !== state) {
              return filtered;
            }
            return [...filtered, post];
          }, []);
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

    async function createPost(data: CreatePostFormInputs) {
      handleLoadingVisibility(true)
      const post = await CreatePost(data);
      insertNewPost(post);
      handleLoadingVisibility(false)
    }

    return {
        posts,
        states,
        categories,
        insertNewPost,
        createPost,
        sendMessageToProvider,
        filterPosts,
        getCitiesByUF
    }
}