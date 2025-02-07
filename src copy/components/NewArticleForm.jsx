import React, { useEffect, useState } from 'react'
// import newsArray from '../assets/data/news.json'
import { getAllNewsData, postNewsArticle } from './apiCalls/api'
import { Navigate, useNavigate } from 'react-router-dom'


function NewArticleForm() {


    //GETS THE NEWS ARRAY FROM THE JASON FILE AND SETS A NEW ID FOR THE NEW NEWS OBJECT TO BE ADDED
    // useEffect(() => {
    //     const fetchNewsArray = async () => {
    //         try {
    //             const response = await fetch('http://localhost:8000/news/')
    //             const data = await response.json()
    //             setOriginalNewsArray(data)
    //         } catch (error) {
    //             console.error('error fetching news', error)
    //         }
    //     };
    //     fetchNewsArray()
    // }, [])



    // const [originalNewsArray, setOriginalNewsArray] = useState([])
    const [image, setImage] = useState('')
    const [title, setTile] = useState('')
    const [description, setDescription] = useState('')
    // const [id, setId] = useState(0)
    const [author, setAuthor] = useState('')

    const Navigate = useNavigate()



    const imageUpdater = (event) => {
        event.preventDefault()
        const imageValue = event.target.value
        setImage(imageValue)
    }

    const authorUpdater = (event) => {
        event.preventDefault()
        const authorValue = event.target.value
        setAuthor(authorValue)
    }

    const titleUpdater = (event) => {
        event.preventDefault()
        const titleValue = event.target.value
        setTile(titleValue)
    }

    const DescriptionUpdater = (event) => {
        event.preventDefault()
        const descriptionValue = event.target.value
        setDescription(descriptionValue)
    }

    // useEffect(() => {
    //     const fetchNewsArray = async () => {
    //         try {
    //             const response = await fetch('http://localhost:8000/news/')
    //             const data = await response.json()
    //             setOriginalNewsArray(data)
    //         } catch (error) {
    //             console.error('error fetching news', error)
    //         }
    //     };
    //     fetchNewsArray()
    // }, [])

    const [idNum, setIdNum] = useState()

    useEffect( ()=>{
        const fetchAllNews = async() =>{
            try {
                const response = await getAllNewsData();
                setIdNum(response.length + 1)
            } catch (error) {
                console.error('error getting id', error)
            }
        }
        fetchAllNews()
    }, [])



    const handleSubmit = async (event) => {

        event.preventDefault();

        const newArticle = {
            image: image,
            title: title,
            description: description,
            author: author,
        };

        try {
            const response = await postNewsArticle(newArticle);

            if (response.status === 201) {                
                setImage('');
                setTile('');
                setDescription('');
                setAuthor('');
                alert('News Article Successfully Added');
                Navigate('/');
                
            } else {
                console.error('Failed to add the article');
            }
        } catch (error) {
            console.error('Error adding the article:', error);
            alert('Their Was An Error While Adding Your Article')

        };

        
        
    }

    


    

    // const handleSubmit = async (event) => {

    //     event.preventDefault();
    //     const newArticle = {
    //         image: image,
    //         title: title,
    //         description: description,
    //         id: originalNewsArray.length + 1,
    //         author: author,
    //     };

    //     try {
    //         const response = await fetch(
    //             'http://localhost:8000/news/',
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(newArticle)
    //             }
    //         );

    //         if (response.ok) {
    //             const addedArticle = response.json();
    //             setOriginalNewsArray((p) => [...p, addedArticle])
    //             setImage('');
    //             setTile('');
    //             setDescription('');
    //             setAuthor('');
    //             alert('News Article Successfully Added')
    //         } else {
    //             console.error('Failed to add the article');
    //         }
    //     } catch (error) {
    //         console.error('Error adding the article:', error);
    //         alert('Their Was An Error While Adding Your Article')

    //     }
    // };




    //THE PREVIOUS ONE I DID TO UPDATE A JASON FILE DIRECTLY IN ERROR
    // const handleSubmit = (event) => {

    //     event.preventDefault(); 
    //     const newArticle = {
    //         image: image,
    //         title: title,
    //         description: description,
    //         id: id,
    //         author: author,
    //     };
    //     newsArray.push(newArticle); 
    // }




    return (
        <div className='w-full min-h-[85vh] bg-gray-500 '>

            <div className=' mx-[100px] '>
                <h3 className=' text-center text-3xl font-bold  '>
                    Add News Item
                </h3>

                <form action="" className='text-black'>

                    <input type="text" placeholder='image'
                        className=' px-5 rounded block w-full h-14 
                        my-5 text-black'
                        onChange={(event)=>imageUpdater(event)} value={image} />
                    <input type="text" placeholder='Author'
                        className=' px-5 rounded block w-full h-14 
                        my-5' onChange={(event)=>authorUpdater(event)} value={author} />
                    <input type="text" placeholder='Title'
                        className=' px-5 rounded block w-full h-14 
                        my-5' onChange={(event)=>titleUpdater(event)} value={title} />
                    <textarea name="" id="" placeholder='News Details'
                        className=' p-5 rounded w-full h-36 '
                        onChange={(event)=>DescriptionUpdater(event)} value={description}></textarea>

                    <button className='w-full bg-gray-700 mt-5 h-10 
                            rounded text-white font-bold 
                            hover:bg-gray-600' onClick={handleSubmit} >
                        Submit
                    </button>

                </form>
            </div>

        </div>
    )
}

export default NewArticleForm