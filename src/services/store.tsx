

export const setToken = (token: any) => {
    sessionStorage.setItem('token', token)
}

export const getToken = () => {
    const token = sessionStorage.getItem('token')
    return token;
}

export const getData = (key: string) => {
    const data = sessionStorage.getItem(key)
    return data;
}
export const setUser = (user:any) => {
    sessionStorage.setItem('user', JSON.stringify(user))
}
export const setData = (key: string, data:any) => {
    sessionStorage.setItem(key, JSON.stringify(data))
}
export const setAuthContext = (authContext: "0"|"1") => {
    sessionStorage.setItem('authContext', authContext)
}
export const removeData = (key:string) => {
    sessionStorage.removeItem(key)
}
export const removeAuthContext = () => {
    sessionStorage.removeItem('authContext')
}