import { zodResolver } from "@hookform/resolvers/zod";
import { CustomTextArea } from "../../../../components/CustomTextArea";
import { CreateCommentContainer, RatingStarContainer } from "./styles";
import {z} from 'zod';
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Star } from "../../../../components/Star";
import { Button } from "../../../../components/Button";
import { usePosts } from "../../../../hooks/usePosts";
import { UserContext } from "../../../../contexts/UserContext";
import { convertFileToBase64 } from "../../../../utils/MediaUtils";

export interface CreateCommentProps {
    postId: string;
}

const createCommentSchema = z.object({
    image: z.any(),
    review: z.string(),    
})

export type CreateCommentFormInputs = z.infer<typeof createCommentSchema>

export function CreateComment({ postId }: CreateCommentProps) {
    const [notaDaAvaliacao, setNotaDaAvaliacao] = useState(0);
    const [hover, setHover] = useState(0);
    const { insertComment } = usePosts();
    const { user } = useContext(UserContext);

    const { register, handleSubmit } = useForm<CreateCommentFormInputs>({
        resolver: zodResolver(createCommentSchema),
    });

    async function createComment(data: CreateCommentFormInputs) {
        let convertedFile;
        const isAFileObject = typeof data.image === 'object';

        if (isAFileObject && data.image?.length > 0) {
            convertedFile = await convertFileToBase64(data.image[0]);
        }

        await insertComment({
            image: convertedFile,
            postId: postId,
            rating: notaDaAvaliacao,
            review: data.review,
            userId: user!.id
        });

        location.reload();
    }

    return (
        <CreateCommentContainer onSubmit={handleSubmit(createComment)}>
            <h3>Diga o que achou do serviço!</h3>
            <RatingStarContainer>
                {[...Array(5)].map((_, i) => {
                    const valorDaEstrela = i + 1;

                    return <Star 
                        key={valorDaEstrela} 
                        notaSelecionada={notaDaAvaliacao} 
                        valorDeAvaliacao={valorDaEstrela} 
                        acao={setNotaDaAvaliacao}
                        passarOMouse={hover}
                        acaoAoPassarOMouse={setHover}
                    />
                })}
            </RatingStarContainer>
        
            <CustomTextArea 
                register={register}
                id="review" 
                placeholder="Digite sobre o que achou do serviço, se recomendaria para outras pesosas, etc..."/>

            <input 
                type="file" 
                accept="image/*"
                {...register('image')}
            />

            <Button>Comentar</Button>
        </CreateCommentContainer>
    )
}