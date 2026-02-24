export const generateToken = (username: string, password: string) => {
    return btoa(`${username}:${password}`)
}
