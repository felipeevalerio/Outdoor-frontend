import { useNavigate, useParams } from "react-router-dom";
import { CommentSection, PostDetailsContainer, PostDetailsHeader, PostDetailsInfo, PostDetailsMainContent } from "./styles";
import { usePosts } from "../../hooks/usePosts";
import { useContext, useEffect } from "react";
import { Routes } from "../../routes";
import { RatingInfo } from "../../components/RatingInfo";
import { Button } from "../../components/Button";
import { Avatar } from "../../components/Avatar";
import { Comment } from "../../components/Comment";
import { UserContext } from "../../contexts/UserContext";
import { PostNotFoundMessage } from "../Services/components/ListServices/styles";
import placeholderImg from '../../assets/placeholder.png';
import { CreateComment } from "./components/CreateComment";
 
export function PostDetails() {
    const { idServico } = useParams();
    const { getPostById, currentPost, sendMessageToProvider } = usePosts();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (idServico) {
            getPostById(idServico);
        }
        else {
            navigate(Routes.Services)
        }
    }, [idServico])

    const userAlreadyCommented = currentPost?.comments.find(comment => comment.userId === user?.id)

    function redirectToServices() {
        navigate(Routes.Services);
    }

    return currentPost && (
        <PostDetailsContainer>
            <Button onClick={redirectToServices}>Voltar</Button>
            <PostDetailsMainContent>
                <img src={currentPost.image ?? placeholderImg} alt="" />
                <PostDetailsInfo>
                    <PostDetailsHeader>
                        <h1>{currentPost.title}</h1>
                        <RatingInfo rating={currentPost.rating}/>
                    </PostDetailsHeader>
                    <em>
                        <span>Realizado por  <strong><Avatar/>{currentPost.user.name} </strong></span>
                        <span>{currentPost.city} - {currentPost.district}</span>
                    </em>
                    <p>{currentPost.description}</p>
                    <Button 
                        variant="green"
                        onClick={() => sendMessageToProvider(currentPost)}
                    >
                        Contratar
                    </Button>
                </PostDetailsInfo>
            </PostDetailsMainContent>
            
            <CommentSection>
                <h2>Veja o que as pessoas comentaram sobre esse serviço!</h2>
                {currentPost.comments.length > 0 ? (
                    <ul>
                    {currentPost.comments.map(comment => {
                        return (
                            <Comment 
                                key={comment.id} 
                                comment={comment}
                            />
                        )
                    })}
                    </ul>
                ) : (
                    <PostNotFoundMessage>Seja o primeiro a comentar!</PostNotFoundMessage>
                )}

                {(!userAlreadyCommented && user?.userType === 'client') && <CreateComment postId={currentPost.id}/>}
            </CommentSection>
        </PostDetailsContainer>
    )
}