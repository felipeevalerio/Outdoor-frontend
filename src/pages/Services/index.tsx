import { ChangeEvent, useContext, useEffect, useState } from "react";
import { usePosts } from "../../hooks/usePosts";
import { ListServices } from "./components/ListServices";
import { CustomLinkWithChildren, ProviderButtonsArea, Select, ServicesActions, ServicesContainer } from "./styles";
import { Button } from "../../components/Button";
import { CreatePostModal } from "./components/CreatePostModal";
import * as Dialog from "@radix-ui/react-dialog";
import { UserContext } from "../../contexts/UserContext";
import { CitySelect } from "../../components/CitySelect";
import { CityModel } from "../../api/geolocation/models/CityModel";
import { StateSelect } from "../../components/StateSelect";
import { Routes } from "../../routes";

export function Services() {
    const { user } = useContext(UserContext);
    const { categories, filterPosts, states, getCitiesByUF} = usePosts();

    const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
    const [currentCity, setCurrentCity] = useState<string | null>(null);
    const [currentState, setCurrentState] = useState<string | null>(null);

    const [cities, setCities] = useState<CityModel[]>([]);

    useEffect(() => {
        handleGetCitiesByUF();
    }, [currentState]);

    function renderCreatePostModal() {
        return (
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button>Cadastrar serviço</Button>
                </Dialog.Trigger>
                <CreatePostModal/>
            </Dialog.Root>
        )
    }

    function handleChangeCurrentCategory(e: ChangeEvent<HTMLSelectElement>) {
        setCurrentCategoryId(e.target.value);
    }

    function handleChangeCurrentCity(e: ChangeEvent<HTMLSelectElement>) {
        setCurrentCity(e.target.value);
    }

    function handleChangeCurrentState(e: ChangeEvent<HTMLSelectElement>) {
        setCurrentState(e.target.value);
    }

    async function handleGetCitiesByUF() {
        if (!currentState) {
            return;
        }

        const response = await getCitiesByUF(currentState)
        setCities(response);
    }

    function renderManagePostsButton() {
        return (
            <CustomLinkWithChildren
                to={Routes.MyServices}
            >   
                <Button variant='green'>Gerenciar posts</Button>
            </CustomLinkWithChildren>
        )
    }

    function renderSelects() {
        return (
            <div className="selects-container">
            <Select onChange={handleChangeCurrentCategory} defaultValue=''>
                <option value="" >Selecione uma categoria</option>
                {categories.map(category => {
                    return <option
                        key={category.id} 
                        value={category.id}
                    >
                        {category.name}
                    </option>
                })}
            </Select>

            <StateSelect onChange={handleChangeCurrentState}/>
            <CitySelect cities={cities} disabled={!currentState} onChange={handleChangeCurrentCity}/>
        </div>
        );
    }

    const filteredPosts = filterPosts(currentCategoryId, currentCity, currentState);

    return (
        <ServicesContainer>
            <ServicesActions>
                {renderSelects()}
                {user?.userType === 'provider' && (
                    <ProviderButtonsArea>
                        {renderManagePostsButton()}
                        {renderCreatePostModal()}
                    </ProviderButtonsArea>
                )}
            </ServicesActions>
            <ListServices posts={filteredPosts}/>
            
        </ServicesContainer>
    )
}