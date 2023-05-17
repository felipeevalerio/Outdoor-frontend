import { Button } from "../../../../components/Button";
import { ErrorMessage, Title } from "../../../../components/Form/styles";
import { Input } from "../../../../components/Input";
import { ButtonsContainer, FormContent } from "../../../LoginModal/styles";
import { EditPostModalContainer, InputsCreatePostContainer } from "./styles";
import {z} from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomSelect, ISelectOptions } from "../../../../components/CustomSelect";
import { usePosts } from "../../../../hooks/usePosts";
import { CustomTextArea } from "../../../../components/CustomTextArea";
import { useContext, useEffect, useState } from "react";
import { convertFileToBase64 } from "../../../../utils/MediaUtils";
import { StateSelect } from "../../../../components/StateSelect";
import { CitySelect } from "../../../../components/CitySelect";
import { CityModel } from "../../../../api/geolocation/models/CityModel";
import { useUser } from "../../../../hooks/useUser";
import { PostModel } from "../../../../api/services/models/PostModel";
import { UserContext } from "../../../../contexts/UserContext";

interface IEditPostModalProps {
    post: PostModel;
}

const editPostFormSchema = z.object({
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
})

export type EditPostFormInputs = z.infer<typeof editPostFormSchema>

export function EditPostModal({post}:IEditPostModalProps) {
    const { categories, getCitiesByUF, editPost } = usePosts();
    const { user } = useContext(UserContext)
    const [cities, setCities] = useState<CityModel[]>([]);
    const { register, handleSubmit, watch,reset,  formState: { isSubmitting, errors  }, control } = useForm<EditPostFormInputs>({
        resolver: zodResolver(editPostFormSchema),
        defaultValues: {
            categoryId: post?.categoryId,
            city: post?.city,
            contactNumber: post?.contactNumber,
            description: post?.description,
            district: post?.district,
            image: post?.image,
            state: post?.state,
            title: post?.title,
        }
    });

    const state = watch('state');

    useEffect(() => {
        if (state) {
            handleGetCitiesByUF()
        }
    }, [state])

    function handleCategoriesToSelectItems() {
        return categories.map(category => ({
            title: category.name,
            value: category.id
        }) as ISelectOptions)
    }

    async function handleEditPost(data: EditPostFormInputs) {
        let convertedFile;
        const isAFileObject = typeof data.image === 'object';

        if (isAFileObject && data.image?.length > 0) {
            convertedFile = await convertFileToBase64(data.image[0]);
        }
        else {
            convertedFile = post.image;
        }

        await editPost({
            ...data,
            image: convertedFile,
            id: post?.id,
            userId: user?.id!
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
        <EditPostModalContainer onSubmit={handleSubmit(handleEditPost)}>
            <Title>Editar serviço</Title>
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
                    {!post.image && <input 
                        type="file"     
                        accept="image/*"
                        id="image"
                        {...register('image')}
                    />}
                </InputsCreatePostContainer>
                <ButtonsContainer>
                    <Button 
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Editar
                    </Button>
                </ButtonsContainer>
            </FormContent>
        </EditPostModalContainer>
    );
}