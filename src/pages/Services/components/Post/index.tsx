import { useState } from "react";
import { PostModel } from "../../../../api/services/models/PostModel";
import { HireButton, PostActions, PostContainer, PostInfo, UserInfo } from "./styles";
import { RatingInfo } from "../../../../components/RatingInfo";
import { Heart } from "phosphor-react";
import { usePosts } from "../../../../hooks/usePosts";
import PlaceholderImg from '../../../../assets/placeholder.png';

interface IPostProps {
    post: PostModel;
}

export function Post({ post }: IPostProps) {
    const [favoriteButtonWeight, setFavoriteButtonWeight] = useState<'fill' | 'regular'>('regular');
    const { sendMessageToProvider } = usePosts();

    function handleHirePost() {
        sendMessageToProvider(post);
    }

    function handleFavoritePost() {
        // favorite user post in local storage
    }

    return (
        <PostContainer>
            <img className="image" src={post.image ?? PlaceholderImg} alt="" />
            <PostInfo>
                <h2>{post.title}</h2>
                <p className="description">{post.description}</p>
                <UserInfo>
                    <div className="user-details">
                        <img src={post.user?.avatar} alt="" />
                        <p>{post.user?.name}</p>
                    </div>
                    <RatingInfo rating={post.rating}/>
                </UserInfo>
                    <span>{post.city} - {post.district}</span>
            </PostInfo>
            <PostActions>
                <HireButton onClick={handleHirePost}>Contratar</HireButton>
                <button className="favorite-button" onClick={handleFavoritePost}>
                    <Heart 
                        weight={favoriteButtonWeight} 
                        onMouseLeave={() => setFavoriteButtonWeight('regular')} 
                        onMouseEnter={() => setFavoriteButtonWeight('fill')} 
                        size={32}
                    />
                </button>
            </PostActions>
        </PostContainer>
    );
}