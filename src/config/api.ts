import md5 from 'md5'

export const ApiBase: string = 'https://gateway.marvel.com/v1/public'
export const ApiKey: string = (process.env.REACT_APP_MARVEL_API_KEY as string)
const ApiPrivateKey: string = (process.env.REACT_APP_MARVEL_API_PRIVATE_KEY as string)

export const ApiHash = () => {
    const ts = new Date().getTime()
    const hash = md5(ts + ApiPrivateKey + ApiKey)
    return { ts, hash }
}

const createAuthParams = () => {
    const { ts, hash } = ApiHash()
    return { ts, hash, apikey: ApiKey }
}

export const endPoints = {
    characters: '/characters',
    character: (id: number) => `/characters/${id}`,
    comics: '/comics',
    creators: '/creators',
    events: '/events',
    series: '/series',
    stories: '/stories',
}

export const createQueryParams = (params: any) => {
    return Object.keys(params).map((key: any) => `${key}=${params[key]}`).join('&')
}

export const createEndpoint = (endpoint: string) => {
    const authParams = createAuthParams()
    const authQuery = createQueryParams(authParams)
    return `${ApiBase}${endpoint}?${authQuery}`
}

export const createEndpointWithParams = (endpoint: string, params: any) => {
    const url = createEndpoint(endpoint)
    const query = createQueryParams(params)
    return `${url}&${query}`
}

