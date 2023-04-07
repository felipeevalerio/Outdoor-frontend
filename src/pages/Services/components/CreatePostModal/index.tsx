import { Button } from "../../../../components/Button";
import { ErrorMessage, Title } from "../../../../components/Form/styles";
import { Input } from "../../../../components/Input";
import { ButtonsContainer, FormContent } from "../../../LoginModal/styles";
import { CreatePostModalContainer, InputsCreatePostContainer } from "./styles";
import {z} from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomSelect, ISelectOptions } from "../../../../components/CustomSelect";
import { usePosts } from "../../../../hooks/usePosts";
import { CustomTextArea } from "../../../../components/CustomTextArea";
import { useEffect } from "react";
import { convertFileToBase64 } from "../../../../utils/MediaUtils";

const createPostFormSchema = z.object({
    title: z.string().nonempty('Serviço deve possuir um título'),
    categoryId: z.string().nonempty('Serviço deve estar vinculado a uma categoria'),
    city: z.string().nonempty('Serviço deve possuir uma cidade associado'),
    district: z.string().nonempty('Serviço deve conter um bairro associado').max(50),
    description: z.string().nonempty('Serviço deve conter uma descrição').max(500),
    image: z.instanceof(FileList).transform(file => convertFileToBase64(file[0])),
    state: z.string().nonempty('Serviço deve possuir um estado associado'),
    contactNumber: z
        .string()
        .refine(number => number.length === 11, 'Telefone deve possuir 11 dígitos')
        .refine(number => number.slice(0,2) === '55', 'Telefone deve começar com 55'),
})

type CreatePostFormInputs = z.infer<typeof createPostFormSchema>

export function CreatePostModal() {
    const { categories } = usePosts();

    const { register, handleSubmit , formState: { isSubmitting,errors  }, control, } = useForm<CreatePostFormInputs>({
        resolver: zodResolver(createPostFormSchema)
    });
    function handleCategoriesToSelectItems() {
        return categories.map(category => ({
            title: category.name,
            value: category.id
        }) as ISelectOptions)
    }

    function handleCreatePost(data: CreatePostFormInputs) {
        console.log(data)
    }

    return (
        <CreatePostModalContainer onSubmit={handleSubmit(handleCreatePost)}>
            <Title>Cadastrar serviço</Title>
            <FormContent>
                <InputsCreatePostContainer>
                    <Input 
                        id="title" 
                        type="text"
                        placeholder="Título"
                        register={register}
                    />
                    {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
                    <Input 
                        id="city" 
                        type="text"
                        placeholder="Cidade"
                        register={register}
                    />
                    {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
                    <Input 
                        id="state" 
                        type="text"
                        placeholder="Estado"
                        register={register}
                    />
                    {errors.state && <ErrorMessage>{errors.state.message}</ErrorMessage>}
                    <Input 
                        id="district" 
                        type="text"
                        placeholder="Bairro"
                        register={register}
                    />
                    {errors.district && <ErrorMessage>{errors.district.message}</ErrorMessage>}
                    <Input 
                        id="contactNumber" 
                        type="text"
                        placeholder="Telefone (55932131234)"
                        register={register}
                        maxLength={11}
                    />
                    {errors.contactNumber && <ErrorMessage>{errors.contactNumber.message}</ErrorMessage>}
                    <CustomTextArea 
                        id="description"
                        placeholder="Descrição do serviço"
                        register={register}
                    />
                    {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                    <CustomSelect 
                        control={control}
                        controllerName="categoryId"
                        items={handleCategoriesToSelectItems()}
                    />
                    <input 
                        type="file" 
                        accept="image/*"
                        {...register('image')}
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