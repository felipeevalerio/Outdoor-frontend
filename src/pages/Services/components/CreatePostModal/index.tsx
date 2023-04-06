import { Button } from "../../../../components/Button";
import { Title } from "../../../../components/Form/styles";
import { Input } from "../../../../components/Input";
import { ButtonsContainer, FormContent } from "../../../LoginModal/styles";
import { CreatePostModalContainer, InputsCreatePostContainer } from "./styles";
import {z} from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomSelect, ISelectOptions } from "../../../../components/CustomSelect";
import { usePosts } from "../../../../hooks/usePosts";
import { CustomTextArea } from "../../../../components/CustomTextArea";

const createPostFormSchema = z.object({
    title: z.string().nonempty('Serviço deve possuir um título'),
    categoryId: z.string().nonempty('Serviço deve estar vinculado a uma categoria'),
    city: z.string().nonempty('Serviço deve possuir uma cidade associado'),
    district: z.string().nonempty('Serviço deve conter um bairro associado').max(50),
    description: z.string().nonempty('Serviço deve conter uma descrição').max(500),
    image: z.string().nullable(),
    state: z.string().nonempty('Serviço deve possuir um estado associado'),
    contactNumber: z
        .string()
        .refine(number => number.length === 11, 'Telefone deve possuir 11 dígitos'),
})

type CreatePostFormInputs = z.infer<typeof createPostFormSchema>

export function CreatePostModal() {
    const { categories } = usePosts();

    const { register, formState: { isSubmitting }, control, } = useForm<CreatePostFormInputs>({
        resolver: zodResolver(createPostFormSchema)
    });

    function handleCategoriesToSelectItems() {
        return categories.map(category => ({
            title: category.name,
            value: category.id
        }) as ISelectOptions)
    }

    return (
        <CreatePostModalContainer>
            <Title>Cadastrar serviço</Title>
            <FormContent>
                <InputsCreatePostContainer>
                    <Input 
                        id="title" 
                        type="text"
                        placeholder="Título"
                        register={register}
                    />

                    <Input 
                        id="city" 
                        type="text"
                        placeholder="Cidade"
                        register={register}
                    />
                    <Input 
                        id="state" 
                        type="text"
                        placeholder="Estado"
                        register={register}
                    />
                    <Input 
                        id="district" 
                        type="text"
                        placeholder="Bairro"
                        register={register}
                    />
                    <Input 
                        id="contactNumber" 
                        type="text"
                        placeholder="Telefone (55932131234)"
                        register={register}
                    />

                    <CustomTextArea 
                        id="description"
                        placeholder="Descrição do serviço"
                        register={register}
                    />

                    <CustomSelect 
                        control={control}
                        controllerName="category"
                        items={handleCategoriesToSelectItems()}
                    />
                </InputsCreatePostContainer>
                <ButtonsContainer>
                    <Button 
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Cadastrar
                    </Button>
                </ButtonsContainer>
            </FormContent>
        </CreatePostModalContainer>
    );
}