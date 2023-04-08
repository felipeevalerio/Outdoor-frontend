import axios from "axios";
import { CityModel, GetAllCitiesResponse } from "./models/CityModel";


export async function GetAllCities() {
    const url = 'https://brasilapi.com.br/api/ibge/municipios/v1/mg?providers=dados-abertos-br,gov,wikipedia';
    const response =  await axios.get(url);
    return response.data.map((city: GetAllCitiesResponse) => ({
        id: city.codigo_ibge,
        name: city.nome 
    } as CityModel))
}