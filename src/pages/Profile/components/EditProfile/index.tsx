import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../components/Button";
import { Title } from "../../../../components/Form/styles";
import { Input } from "../../../../components/Input";
import { FormContent, InputsContainer, RegisterForm } from "../../../RegisterModal/styles";
import { useForm } from "react-hook-form";
import {z} from 'zod';
import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import { useUser } from "../../../../hooks/useUser";
import { convertFileToBase64 } from "../../../../utils/MediaUtils";

const editUserSchema = z.object({
    email: z.string().email('Deve possuir um formato válido de email'),
    name: z.string().min(1),
    image: z.any()
})

type EditUserFormInput = z.infer<typeof editUserSchema>;

export function EditProfile() {
    const { user } = useContext(UserContext);
    const { editUser } = useUser();

    const { register, handleSubmit, formState: { isSubmitting }} = useForm<EditUserFormInput>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            email: user?.email,
            name: user?.name
        }
    });

    async function handleEditUser(data: EditUserFormInput) {
        let convertedFile;
        const isAFileObject = typeof data.image === 'object';

        if (isAFileObject && data.image?.length > 0) {
            convertedFile = await convertFileToBase64(data.image[0]);
        }
        else {
            convertedFile = user!.avatar;
        }

        await editUser({
            email: data.email,
            name: data.name,
            id: user!.id,
            avatar: convertedFile
        })

        location.reload();
    }

    return (
        <RegisterForm onSubmit={handleSubmit(handleEditUser)}>
        <Title>Editar perfil</Title>
        <FormContent>
            <InputsContainer>
                <Input 
                    id="name" 
                    type="text"
                    placeholder="Nome"
                    register={register}
                />
                <Input 
                    id="email" 
                    type="email"
                    placeholder="Email"
                    register={register}
                />

                <input 
                    type="file" 
                    accept="image/*"
                    {...register('image')}
                />
            </InputsContainer>
                <Button 
                    type="submit"
                    disabled={isSubmitting}
                >
                    Editar perfil
                </Button>
        </FormContent>
    </RegisterForm>
    )
}