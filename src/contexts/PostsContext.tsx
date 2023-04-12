import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { CategoryModel, PostModel } from "../api/services/models/PostModel";
import { LoadingContext } from "./LoadingContext";
import { GetCategories, GetPosts } from "../api/services/post-api";
import { GetAllStates } from "../api/geolocation/geolocation-api";
import { StateModel } from "../api/geolocation/models/CityModel";

interface PostsContextTypes {
    posts: PostModel[];
    insertNewPost: (newPost: PostModel) => void;
    changePosts: (newPosts: PostModel[]) => void;
    categories: CategoryModel[];
    states: StateModel[];
}

export const PostsContext = createContext({} as PostsContextTypes);

interface IPostsProviderProps {
    children: ReactNode;
}

export function PostsProvider({ children }: IPostsProviderProps) {
    const { handleLoadingVisibility } = useContext(LoadingContext);
    
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [states, setStates] = useState<StateModel[]>([]);

    useEffect(() => {
        getAllCategoriesAndPosts();
    }, []);

    function changePosts(newPosts: PostModel[]) {
        setPosts(newPosts);
    }

    function insertNewPost(newPost: PostModel) {
        setPosts(state => [...state, newPost]);
    }

    async function getAllCategoriesAndPosts() {
        handleLoadingVisibility(true)

        const result = await Promise.all([GetPosts(), GetCategories(), GetAllStates()]);
        setPosts(result[0]);
        setCategories(result[1])
        setStates(result[2])

        handleLoadingVisibility(false)
    }

    return (
        <PostsContext.Provider value={{posts, categories, states, insertNewPost, changePosts}}>
            {children}
        </PostsContext.Provider>
    )
}