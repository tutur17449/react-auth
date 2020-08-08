import fetcher from '../tools/fetcher'

const checkAuth = async () => {
    const config = {
        method: 'GET',
        credentials: 'include',
    }

    const checkUser = await fetcher(`${process.env.REACT_APP_API_URL}api/auth/me`, config)
    return checkUser
}

const login = async (data) => {
    const config = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const loginUser = await fetcher(`${process.env.REACT_APP_API_URL}api/auth/login`, config)
    return loginUser
}

const register = async (data) => {
    const config = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const registerUser = await fetcher(`${process.env.REACT_APP_API_URL}api/auth/register`, config)
    return registerUser
}

const logout = async () => {
    const config = {
        method: 'GET',
        credentials: 'include',
    }

    const logoutUser = await fetcher(`${process.env.REACT_APP_API_URL}api/auth/logout`, config)
    return logoutUser
}

export {checkAuth, login, register, logout}