import { SelectHTMLAttributes } from "react";
import { Select } from "../../pages/Services/styles";
import { CityModel } from "../../api/geolocation/models/CityModel";
import { usePosts } from "../../hooks/usePosts";

interface StateSelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    register?: any;
}

export function StateSelect({register, id, ...props }: StateSelectProps) {
    const { states } = usePosts();
    
    return (
        <Select {...props} {...register?.(id)} id={id} defaultValue='' {...props}>
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