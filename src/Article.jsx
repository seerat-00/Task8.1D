import React, { useState } from 'react';
import Image from './Image_Storage';
import './Articles.css'
import { addDoc, collection } from 'firebase/firestore';
import exportfirebase from './firebase';
import { Link } from 'react-router-dom';

const Article = () => {

    const [title, setTitle] = useState('')
    const [abstract, setAbstract] = useState('')
    const [article, setArticle] = useState('')
    const [tag, setTag] = useState('')
    const [error, setError] = useState('')

    const handlePostSubmit = async(e) =>{
        e.preventDefault();

        try{
          const postID ={
            title,
            abstract,
            article,
            tag: tag.split(',').map(tag => tag.trim()),
            timestamp: new Date(),
        };
        
        await addDoc(collection(exportfirebase.postUpload, 'posts'), postID);
        alert('Question posted successfully')

        setTitle('')
        setArticle('')
        setAbstract('')
        setTag('')
        setError('')
        }
        catch(error){
            setError('Error adding the document' +error.message)
            setError('')
        }
    };

    return (
      <form onSubmit={handlePostSubmit}>
        <div >
            <h3>What do you want to ask or share</h3>
        </div>
  
        <div>
          <label >Title</label>
          <input 
            type='text'
            placeholder="Enter the title of your article"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />
        </div>

        <div>
          <label>Abstract</label>
          <textarea 
            placeholder="Enter 1 paragraph abstract " 
            rows={3}
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            required
          />
        </div>
  
        <div>
          <label>Article</label>
          <textarea
            placeholder="Write your article here" 
            rows={7}
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Tags</label>
          <input
            type='text'
            placeholder="Please add upto 3 tags" 
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          />
        </div>

        <Image />
        <button type="submit">Post</button>
        {error && <p style={{color:'red'}}>{error} </p>}
        <span> 
        <h5>Have some  difficulty in asking questions??
        Click the button to see the questions asked by previous users?
        </h5>
            <Link to='/find'>
                <button type='button'>Find</button>
            </Link>
        </span>
      </form>
    );
  };

export default Article;
  