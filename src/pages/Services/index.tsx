import { ChangeEvent, useContext, useEffect, useState } from "react";
import { usePosts } from "../../hooks/usePosts";
import { ListServices } from "./components/ListServices";
import { Select, ServicesActions, ServicesContainer } from "./styles";
import { Button } from "../../components/Button";
import { CreatePostModal } from "./components/CreatePostModal";
import * as Dialog from "@radix-ui/react-dialog";
import { UserContext } from "../../contexts/UserContext";
import { CitySelect } from "../../components/CitySelect";

export function Services() {
    const { user } = useContext(UserContext);
    const { categories, filterPosts } = usePosts();

    const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
    const [currentCity, setCurrentCity] = useState<string | null>(null);

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

    function handleChangeCurrentCategory(e: ChangeEvent<HTMLSelectElement>) {
        setCurrentCategoryId(e.target.value);
    }

    function handleChangeCurrentCity(e: ChangeEvent<HTMLSelectElement>) {
        setCurrentCity(e.target.value);
    }

    const filteredPosts = filterPosts(currentCategoryId, currentCity);

    return (
        <ServicesContainer>
            <ServicesActions>
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
                    <CitySelect onChange={handleChangeCurrentCity}/>
            </div>
                {renderCreatePostModal()}
            </ServicesActions>
            <ListServices posts={filteredPosts}/>
            
        </ServicesContainer>
    )
}