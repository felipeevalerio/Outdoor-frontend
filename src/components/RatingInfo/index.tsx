import { Star } from "phosphor-react";
import { RatingInfoContainer, MessageNoRating } from "./styles";

interface IRatingInfoProps {
    rating: number;
}

export function RatingInfo({ rating }: IRatingInfoProps) {
    return rating > 0 ? (
        <RatingInfoContainer>
            <Star size={24} weight="fill"/>
            <strong>{rating.toFixed(2)}</strong>
        </RatingInfoContainer>
    ) : <MessageNoRating className="no-rating">Ainda não existem avaliações</MessageNoRating>
}