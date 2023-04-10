import { SelectHTMLAttributes } from "react";
import { Select } from "../../pages/Services/styles";
import { CityModel } from "../../api/geolocation/models/CityModel";
import { usePosts } from "../../hooks/usePosts";

interface CitySelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    cities: CityModel[];
}

export function CitySelect({cities,...props }: CitySelectProps) {

    return (
        <Select {...props} defaultValue='' {...props}>
            <option value="">Selecione uma cidade</option>
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