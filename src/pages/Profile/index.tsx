import { useContext, useEffect } from "react";
import { ProfileContainer } from "./styles";
import { UserContext } from "../../contexts/UserContext";
import { Avatar } from "../../components/Avatar";
import { Button } from "../../components/Button";
import { useUser } from "../../hooks/useUser";
import * as Dialog from "@radix-ui/react-dialog";
import { EditProfile } from "./components/EditProfile";

export function Profile() {
    const { user } = useContext(UserContext);
    const { logoutUser } = useUser();

    return user && (
        <ProfileContainer>
            <Avatar/>
            <strong>{user.name}</strong>
            <span>{user.userType === 'client' ? 'Cliente': 'Prestador de serviços'}</span>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button>Editar perfil</Button>
                </Dialog.Trigger>
                <EditProfile/>
            </Dialog.Root>
            <Button variant='red' onClick={logoutUser}>Sair da conta</Button>
        </ProfileContainer>
    )
}