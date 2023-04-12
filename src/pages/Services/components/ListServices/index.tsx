import { Post } from "../Post";
import { ListServicesContainer, PostNotFoundMessage } from "./styles";
import { PostModel } from "../../../../api/services/models/PostModel";

interface IListServicesProps {
    posts: PostModel[]
}

export function ListServices({ posts }: IListServicesProps) {
    return posts.length > 0 ? (
        <ListServicesContainer>
            {posts.map(post => {
                return (
                    <Post key={post.id} post={post}/>
                )
            })}
        </ListServicesContainer>
    ) : (
        <PostNotFoundMessage>Não existem serviços com os filtros selecionados</PostNotFoundMessage>
    );
}