import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { CategoryModel, PostModel } from "../api/services/models/PostModel";
import { LoadingContext } from "./LoadingContext";
import { GetCategories, GetPosts } from "../api/services/post-api";
import { GetAllCities } from "../api/geolocation/geolocation-api";
import { CityModel } from "../api/geolocation/models/CityModel";

interface PostsContextTypes {
    posts: PostModel[];
    categories: CategoryModel[];
    cities: CityModel[];
}

export const PostsContext = createContext({} as PostsContextTypes);

interface IPostsProviderProps {
    children: ReactNode;
}

export function PostsProvider({ children }: IPostsProviderProps) {
    const { handleLoadingVisibility } = useContext(LoadingContext);
    
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [cities, setCities] = useState<CityModel[]>([]);

    useEffect(() => {
        getAllCategoriesAndPosts();
    }, []);

    async function getAllCategoriesAndPosts() {
        handleLoadingVisibility(true)

        const result = await Promise.all([GetPosts(), GetCategories(), GetAllCities()]);
        setPosts(result[0]);
        setCategories(result[1])
        setCities(result[2])

        handleLoadingVisibility(false)
    }

    return (
        <PostsContext.Provider value={{posts, categories, cities}}>
            {children}
        </PostsContext.Provider>
    )
}