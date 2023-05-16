import { PostModel } from "../../../../../api/services/models/PostModel";
import PlaceholderImg from '../../../../../assets/placeholder.png';
import { Button } from "../../../../../components/Button";
import { RatingInfo } from "../../../../../components/RatingInfo";
import { usePosts } from "../../../../../hooks/usePosts";
import { MyPostActions, MyPostActionsAndRating, MyPostContainer, MyPostInfo } from "./styles";

interface IMyPostProps {
    post: PostModel;
}

export function MyPost({post}: IMyPostProps) {
    const { deletePost } = usePosts();

    async function handleDeletePost() {
        const confirmation = confirm(`Você tem certeza que deseja excluir o serviço '${post.title}'`)
        if (confirmation) {
            await deletePost(post.id);
            window.location.reload();
        }
    }

    return (
        <MyPostContainer>
            <img className="image" src={post.image ?? PlaceholderImg} alt="" />
            <MyPostInfo>
                <h2>{post.title}</h2>
                <p className="description">{post.description}</p>
                <span>{post.city} - {post.district}</span>
            </MyPostInfo>

            <MyPostActionsAndRating>
                <RatingInfo rating={post.rating}/>
                <MyPostActions>
                    <Button>Editar</Button>
                    <Button 
                        variant="red"
                        onClick={handleDeletePost}
                    >
                        Deletar
                    </Button>
                </MyPostActions>
            </MyPostActionsAndRating>
        </MyPostContainer>
    )
}