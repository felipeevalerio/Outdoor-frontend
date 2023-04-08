import { Post } from "../Post";
import { ListServicesContainer } from "./styles";
import { PostModel } from "../../../../api/services/models/PostModel";

interface IListServicesProps {
    posts: PostModel[]
}

export function ListServices({ posts }: IListServicesProps) {
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