import React, { useEffect } from 'react'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getAllNewsData, updateArticle } from './apiCalls/api'

export default function EditArticleForm() {

    const param = useParams()
    const interId = parseInt(param.index, 10)
    // const navlId = interId + 1 
    const [navId, setNavId] = useState('')
    
    
    const [initimage, setInitImage] = useState('')
    const [initTitle, setInitTile] = useState('')
    const [initDescription, setInitDescription] = useState('')
    const [initAuthor, setInitAuthor] = useState('')

    const [image, setImage] = useState('')
    const [title, setTile] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')  
    
    const [navigate, setNavigate] = useState(false)

    const [originalNews, setOriginalNews] = useState([])    

    useEffect(() => {
        const fetchOriginalNews = async () => {
            try {
                const response = await getAllNewsData()
                const article = response[interId]
                setOriginalNews(article)
                setInitImage(article.img);
                setInitTile(article.title);
                setInitDescription(article.content);
                setInitAuthor(article.author);
                setNavId(article.id)
            } catch (error) {
                console.error('error fetching news')
            }
        };
        fetchOriginalNews();

    }, [interId])        


    const imageUpdater = (event) => {
        const imageValue = event.target.value
        setImage(imageValue)
        setInitImage(imageValue)
    }

    const authorUpdater = (event) => {
        const authorValue = event.target.value
        setAuthor(authorValue)
        setInitAuthor(authorValue)
    }

    const titleUpdater = (event) => {
        const titleValue = event.target.value
        setTile(titleValue)
        setInitTile(titleValue)
    }

    const DescriptionUpdater = (event) => {
        const descriptionValue = event.target.value
        setDescription(descriptionValue)
        setInitDescription(descriptionValue)
    }
    

    const saveEditedArticleHandler = async (e) => {

        e.preventDefault()

        const updtedNews = {            
            img: image || initimage,
            title: title || initTitle,
            content: description || initDescription,
            author: author || initAuthor,
            id: originalNews.id
        }        
            
        try {
            const response = await updateArticle(originalNews.id, updtedNews)

            if (response) {
                alert('News Article Successfully updated')
                setNavigate(true)
                setImage('');
                setTile('');
                setDescription('');
                setAuthor('');
                setOriginalNews('')
                setInitImage('');
                setInitTile('');
                setInitDescription('');
                setInitAuthor('')
            } else {
                console.error('Failed to update article');
            }

        } catch (error) {
            console.error('Error editing the article:', error);
            alert('Their Was An Error While editing Your Article')
        }
    }

    if (navigate && navId) {
        return<Navigate to={`/${navId}`} />
    }

    return (
        <div className='w-full min-h-[85vh] bg-gray-500 px-2 sm:px-[50px] '>

            <div>
                <h3 className=' text-center text-3xl font-bold pt-5 '>
                    Edit Post
                </h3>

                <form action="" className='text-black'>

                    <input type="text" placeholder='image'
                        className=' px-5 rounded block w-full h-14 
                        my-5 text-black'
                        onChange={(event) => imageUpdater(event)} value={image || initimage} />
                    <input type="text" placeholder='Author'
                        className=' px-5 rounded block w-full h-14 
                        my-5' onChange={(event) => authorUpdater(event)} value={author || initAuthor} />
                    <input type="text" placeholder='Title'
                        className=' px-5 rounded block w-full h-14 
                        my-5' onChange={(event) => titleUpdater(event)} value={title || initTitle} />
                    <textarea name="" id="" placeholder='News Details'
                        className=' p-5 rounded w-full h-36 '
                        onChange={(event) => DescriptionUpdater(event)} value={description || initDescription}></textarea>

                    <button className='w-full bg-gray-700 mt-5 h-10 
                            rounded text-white font-bold 
                            hover:bg-gray-600'
                        onClick={(e) => saveEditedArticleHandler(e)}>
                        Save
                    </button>

                </form>
            </div>

        </div>
    )
}