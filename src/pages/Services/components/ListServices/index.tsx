import { Post } from "../Post";
import { ListServicesContainer } from "./styles";
import { usePosts } from "../../../../hooks/usePosts";

export function ListServices() {
    const { posts } = usePosts();
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