import { CityModel, GetAllCitiesResponse, GetAllStatesResponse, StateModel } from "./models/CityModel";
import { axiosBaseInstance } from '../../contexts/AxiosContext';

export async function GetAllCitiesFromUF(uf: string) {
    const url = `https://brasilapi.com.br/api/ibge/municipios/v1/${uf}?providers=dados-abertos-br,gov,wikipedia`;
    const response =  await axiosBaseInstance.get(url);
    return response.data.map((city: GetAllCitiesResponse) => ({
        id: city.codigo_ibge,
        name: city.nome 
    } as CityModel))
}

export async function GetAllStates() {
    const url = 'https://brasilapi.com.br/api/ibge/uf/v1';
    const response =  await axiosBaseInstance.get(url);
    return response.data.map((uf: GetAllStatesResponse) => ({
        uf: uf.sigla,
        name: uf.nome 
    } as StateModel))
}