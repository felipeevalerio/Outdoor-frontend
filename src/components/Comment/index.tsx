import { CommentModel } from "../../api/services/models/PostModel";
import { CommentContainer } from "./styles";

interface CommentProps {
    comment: CommentModel;
}

export function Comment({comment}: CommentProps) {
    const formattedDate = Intl.DateTimeFormat('pt-br').format(new Date(comment.createdAt))
    return (
        <CommentContainer>
            <em>{formattedDate}</em>
            <p>{comment.review}</p>
            <img src={comment.image} alt="" />
        </CommentContainer>
    );
}