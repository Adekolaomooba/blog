import axios from "axios";

// const baseUrl = 'http://localhost:8000/'
const baseUrl = 'https://fivic73350.pythonanywhere.com/'

const loginUser = async (payload) =>{        
    try {
        const response = await axios.post(`${baseUrl}users/login/`, payload)
        return response
    } catch (error) {
        console.error('error logging in data', error)
        throw  error
        
    }
}

export {
    loginUser,
}