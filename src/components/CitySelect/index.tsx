import { SelectHTMLAttributes } from "react";
import { Select } from "../../pages/Services/styles";
import { CityModel } from "../../api/geolocation/models/CityModel";

interface CitySelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    cities: CityModel[];
    register?: any;
}

export function CitySelect({register, cities, id, ...props }: CitySelectProps) {

    return (
        <Select {...props} {...register?.(id)} id={id} defaultValue='' {...props}>
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