export interface CityModel {
    id: string;
    name: string;
}

export interface StateModel {
    uf: string;
    name: string;
}

export interface GetAllCitiesResponse {
    nome: string;
    codigo_ibge: string;
}

export interface GetAllStatesResponse {
    sigla: string;
    nome: string;
}