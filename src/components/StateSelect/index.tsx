import { SelectHTMLAttributes } from "react";
import { Select } from "../../pages/Services/styles";
import { CityModel } from "../../api/geolocation/models/CityModel";
import { usePosts } from "../../hooks/usePosts";

interface StateSelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
}

export function StateSelect({...props }: StateSelectProps) {
    const { states } = usePosts();
    
    return (
        <Select {...props} defaultValue='' {...props}>
            <option value="">Selecione um estado</option>
            {states.map(state => {
                return <option
                    key={state.uf} 
                    value={state.uf}
                >
                    {state.name}
                </option>
            })}
        </Select>
    );
}