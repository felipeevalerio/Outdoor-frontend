import { Star } from "phosphor-react";
import { RatingInfoContainer } from "./styles";

interface IRatingInfoProps {
    rating: number;
}

export function RatingInfo({ rating }: IRatingInfoProps) {
    return (
        <RatingInfoContainer>
            <Star size={24} weight="fill"/>
            <strong>{rating.toFixed(2)}</strong>
        </RatingInfoContainer>
    )
}