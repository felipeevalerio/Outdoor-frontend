import { ListServices } from "./components/ListServices";
import { Select, ServicesContainer } from "./styles";

export function Services() {
    return (
        <ServicesContainer>
            <header className="selects-container">
                <Select name="" id="">
                    <option value="" defaultChecked>Categoria</option>
                </Select>
                <Select name="" id="">
                    <option value="" defaultChecked>Região</option>
                </Select>
            </header>
            <ListServices/>
        </ServicesContainer>
    )
}