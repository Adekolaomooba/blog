import axios from "axios";

const baseUrl = 'http://localhost:8000/'
// const baseUrl = 'https://fivic73350.pythonanywhere.com/'

    const getAllNewsData = async () =>{        
        try {
            const response = await axios.get(`${baseUrl}news/`)
            return response.data
        } catch (error) {
            console.error('error fetching data', error)
            throw  error
            
        }
    }

    const getSingleNewsData = async (id) =>{        
        try {
            const response = await axios.get(`${baseUrl}news/${id}/`)
            return response.data
        } catch (error) {
            console.error('error fetching data', error)
            throw  error
            
        }
    }

    const postNewsArticle = async (payLoad) => {
        try {
            const response = await axios.post(`${baseUrl}news/`, payLoad)
            return response.data
        } catch (error) {
            console.error('error loading news items', error);
            throw error
        }
    }

    const updateArticle = async (index, payLoad) => {
        try {
            const response = await axios.put(`${baseUrl}news/${index}/`, payLoad)
            return response.data
        } catch (error) {
            console.error('unable to load the news', error)
        }
    }

    const deleteArticle = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}news/${id}/`)
            return response.data
        } catch (error) {
            console.error('unable to delete the news', error)
        }
    }

    const getAllUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}users/`)
            return response.data
        } catch (error) {           
            console.error('unable to fetch all user data', error)
            throw  error 
        }
    }

    const addNewsUser = async (payLoad) =>{        
        try {
            const response = await axios.post(`${baseUrl}users/`, payLoad)
            return response.data
        } catch (error) {
            console.error('error fetching data', error)
            throw  error            
        }
    }

export {
    getAllNewsData,
    getSingleNewsData,
    postNewsArticle,
    updateArticle,
    deleteArticle,
    getAllUser,
    addNewsUser

}