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
import { useEffect, useState } from "react";
import { convertFileToBase64 } from "../../../../utils/MediaUtils";
import { StateSelect } from "../../../../components/StateSelect";
import { CitySelect } from "../../../../components/CitySelect";
import { CityModel } from "../../../../api/geolocation/models/CityModel";
import { useUser } from "../../../../hooks/useUser";

const createPostFormSchema = z.object({
    title: z.string().nonempty('Serviço deve possuir um título'),
    categoryId: z.string().nonempty('Serviço deve estar vinculado a uma categoria'),
    city: z.string().nonempty('Serviço deve possuir uma cidade associado'),
    district: z.string().nonempty('Serviço deve conter um bairro associado').max(50),
    description: z.string().nonempty('Serviço deve conter uma descrição').max(500),
    image: z.any().nullable(),
    state: z.string().nonempty('Serviço deve possuir um estado associado'),
    contactNumber: z
        .string()
        .refine(number => number.length === 13, 'Telefone deve possuir 13 dígitos')
        .refine(number => number.slice(0,2) === '55', 'Telefone deve começar com 55'),
    userId: z.string()
})

export type CreatePostFormInputs = z.infer<typeof createPostFormSchema>

export function CreatePostModal() {
    const { categories, getCitiesByUF, createPost } = usePosts();
    const { user } = useUser();

    const [cities, setCities] = useState<CityModel[]>([]);

    const { register, handleSubmit, watch, formState: { isSubmitting, isSubmitted, errors  }, control } = useForm<CreatePostFormInputs>({
        resolver: zodResolver(createPostFormSchema),
        defaultValues: {
            userId: user?.id
        }
    });

    const state = watch('state');

    useEffect(() => {
        handleGetCitiesByUF()
    }, [state])

    function handleCategoriesToSelectItems() {
        return categories.map(category => ({
            title: category.name,
            value: category.id
        }) as ISelectOptions)
    }

    async function handleCreatePost(data: CreatePostFormInputs) {
        let convertedFile;
        if (data.image && data.image.length > 0) {
            convertedFile = await convertFileToBase64(data.image[0]);
        }

        await createPost({
            ...data,
            image: convertedFile
        });

        location.reload();
    }

    async function handleGetCitiesByUF() {
        if (!state) {
            return;
        }

        const response = await getCitiesByUF(state)
        setCities(response);
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
                    
                    <StateSelect register={register} id="state"/>
                    {errors.state && <ErrorMessage>{errors.state.message}</ErrorMessage>}
                    
                    <CitySelect id="city" cities={cities} disabled={!state} register={register}/>
                    {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
                    
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
                        placeholder="Telefone (5537932131234)"
                        register={register}
                        maxLength={13}
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
                        placeholder="Selecione uma categoria"
                        items={handleCategoriesToSelectItems()}
                    />
                    {errors.categoryId && <ErrorMessage>{errors.categoryId.message}</ErrorMessage>}
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