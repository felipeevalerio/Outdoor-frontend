import { SelectHTMLAttributes } from "react";
import { usePosts } from "../../hooks/usePosts";
import { Select } from "../../pages/Services/styles";

interface CitySelectProps extends SelectHTMLAttributes<HTMLSelectElement>{

}

export function CitySelect({ ...props }: CitySelectProps) {
    const { cities } = usePosts();
    
    return (
        <Select {...props} defaultValue='' {...props}>
            <option value="">Selecione uma região</option>
            {cities.map(city => {
                return <option
                    key={city.id} 
                    value={city.name}
                >
                    {city.name}
                </option>
            })}
        </Select>
    );
}