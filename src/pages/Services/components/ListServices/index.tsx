import { useEffect } from "react";
import { usePosts } from "../../../../hooks/usePosts";
import { Post } from "../Post";
import { ListServicesContainer } from "./styles";

export function ListServices() {
    const { posts, getAllPosts } = usePosts()
    
    useEffect(() => {
        getAllPosts();
    }, [])

    return (
        <ListServicesContainer>
            {posts.map(post => {
                return (
                    <Post key={post.id} post={post}/>
                )
            })}
        </ListServicesContainer>
    );
}