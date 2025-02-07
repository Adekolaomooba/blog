import axios from "axios";

const baseUrl = 'https://fivic73350.pythonanywhere.com/'
// const baseUrl = 'https://fivic73350.pythonanywhere.com/'
// https://fivic73350.pythonanywhere.com/users/login/

    const getAllNewsData = async () =>{        
        try {
            const response = await axios.get(`${baseUrl}blogs/`)
            return response.data
        } catch (error) {
            console.error('error fetching data', error)
            throw  error
            
        }
    }

    const getSingleNewsData = async (id) =>{        
        try {
            const response = await axios.get(`${baseUrl}blogs/${id}/`)
            return response.data
        } catch (error) {
            console.error('error fetching data', error)
            throw  error
            
        }
    }

    const postNewsArticle = async (payLoad) => {
        try {
            const response = await axios.post(`${baseUrl}blogs/`, payLoad)
            return response.data
        } catch (error) {
            console.error('error loading news items', error);
            throw error
        }
    }

    const updateArticle = async (index, payLoad) => {
        try {
            const response = await axios.put(`${baseUrl}blogs/${index}/`, payLoad)
            return response.data
        } catch (error) {
            console.error('unable to load the news', error)
        }
    }

    const deleteArticle = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}blogs/${id}/`)
            return response.data
        } catch (error) {
            console.error('unable to delete the news', error)
        }
    }

    const loginUser = async (payLoad) => {
        try {
            const response = await axios.post(`${baseUrl}users/login/` , payLoad);
            return response.data
        } catch (error) {
            console.error('couldnt login', error)
        }
    }

    // const getAllUser = async () => {
    //     try {
    //         const response = await axios.get(`${baseUrl}users/`)
    //         return response.data
    //     } catch (error) {           
    //         console.error('unable to fetch all user data', error)
    //         throw  error 
    //     }
    // }

    // const addNewsUser = async (payLoad) =>{        
    //     try {
    //         const response = await axios.post(`${baseUrl}users/`, payLoad)
    //         return response.data
    //     } catch (error) {
    //         console.error('error fetching data', error)
    //         throw  error            
    //     }
    // }

export {
    getAllNewsData,
    getSingleNewsData,
    postNewsArticle,
    updateArticle,
    deleteArticle,
    loginUser
    // getAllUser,
    // addNewsUser

}