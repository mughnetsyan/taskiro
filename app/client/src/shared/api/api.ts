const BASE_URL = import.meta.env.VITE_BASE_URL

export const getRequestPath = (url: string) => {
    return [BASE_URL, url].join('/')
}