import axios from "axios"
import { createEndpoint, createEndpointWithParams, endPoints } from "../config/api"
import localStorageService from "./localStorageService"
import { stripCharacterData } from "./stripData"

export class marvelApiService {

    static async getCharacterById(id: number) {
        const url = createEndpoint(endPoints.character(id))
        const response = await axios.get(url)
        return Promise.resolve(response.data.data.results[0])
    }

    static async getCharactersLO(offset: number, limit: number) {

        const start = offset
        const end = offset + limit
        const key = `characters-${start}:${end}`

        if (localStorageService.has(key))
            return localStorageService.get(key)

        const url = createEndpointWithParams(endPoints.characters, { offset, limit })

        try {
            const response = await axios.get(url)
            const charactersData = response.data.data
            localStorageService.set(key, stripCharacterData(charactersData))
            return Promise.resolve(charactersData)
        } catch (error) {
            console.error(error)
        }
    }

    static async getAllCharacters() {

        let limit = 100
        let offset = 0

        const charactersData = await marvelApiService.getCharactersLO(offset, limit)

        while (charactersData.total > offset) {
            offset += limit
            const nextCharactersData = await marvelApiService.getCharactersLO(offset, limit)
            charactersData.results = [...charactersData.results, ...nextCharactersData.results]
        }

        return Promise.resolve(charactersData.results)

    }

}