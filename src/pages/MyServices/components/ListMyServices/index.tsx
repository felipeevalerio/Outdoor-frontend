import { PostModel } from "../../../../api/services/models/PostModel";
import { ListServicesContainer, PostNotFoundMessage } from "../../../Services/components/ListServices/styles";
import { MyPost } from "./MyPost";

interface IListMyServicesProps {
    posts: PostModel[];
}

export function ListMyServices({posts}: IListMyServicesProps) {
    return posts.length > 0 ? (
        <ListServicesContainer>
            {posts.map(post => {
                return (
                    <MyPost key={post.id} post={post}/>
                )
            })}
        </ListServicesContainer>
    ) : (
        <PostNotFoundMessage>Você ainda não possui nenhum post.</PostNotFoundMessage>
    );
}