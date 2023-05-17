import { useEffect } from "react";
import { usePosts } from "../../hooks/usePosts";
import { useUser } from "../../hooks/useUser";
import { ListMyServices } from "./components/ListMyServices";
import { MyServicesContainer } from "./styles";

export function MyServices() {
    const { getPostsFromUser, userPosts } = usePosts();
    const { user } = useUser()

    useEffect(() => {
        if (user) {
            getPostsFromUser(user.id);
        }
    }, [user])

    return (
        <MyServicesContainer>
            <h1>Meus serviços</h1>
            <ListMyServices posts={userPosts}/>
        </MyServicesContainer>
    )
}