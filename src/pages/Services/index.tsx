import { useContext, useEffect, useState } from "react";
import { usePosts } from "../../hooks/usePosts";
import { ListServices } from "./components/ListServices";
import { Select, ServicesActions, ServicesContainer } from "./styles";
import { Button } from "../../components/Button";
import { CreatePostModal } from "./components/CreatePostModal";
import * as Dialog from "@radix-ui/react-dialog";
import { UserContext } from "../../contexts/UserContext";

export function Services() {
    const { user } = useContext(UserContext);
    
    function renderCreatePostModal() {
        return user?.userType === 'provider' && (
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button>Cadastrar serviço</Button>
                </Dialog.Trigger>
                <CreatePostModal/>
            </Dialog.Root>
        )
    }

    return (
        <ServicesContainer>
            <ServicesActions>
                <div className="selects-container">
                    <Select name="" id="">
                        <option value="" defaultChecked>Categoria</option>
                    </Select>
                    <Select name="" id="">
                        <option value="" defaultChecked>Região</option>
                    </Select>
            </div>
                    {renderCreatePostModal()}
            </ServicesActions>
            <ListServices />
            
        </ServicesContainer>
    )
}