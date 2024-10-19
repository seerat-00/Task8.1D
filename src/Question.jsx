import React, {useState} from 'react';
import Image from './Image_Storage';
import './Articles.css'
import { addDoc, collection } from 'firebase/firestore';
import exportfirebase from './firebase';
import { Link } from 'react-router-dom';

const Question = () => {
    const [title, setTitle] = useState('')
    const [question, setQuestion] = useState('')
    const [tag, setTag] = useState('')
    const [error, setError] = useState('')

    const handlePostSubmit = async(e) =>{
        e.preventDefault();

        try{
          const postID ={
            title,
            question,
            tag: tag.split(',').map(tag => tag.trim()),
            timestamp: new Date(),
        };
        
        await addDoc(collection(exportfirebase.postUpload, 'posts'), postID);
        alert('Article posted successfully')

        setTitle('')
        setQuestion('')
        setTag('')
        setError('')
        }
        catch(error){
            setError('Error adding the document' + error.message )
        }
    };


    return (
      <form onSubmit={handlePostSubmit}>
        <div >
            <h3>What do you want to ask or share</h3>
        </div>
  
        <div>
          <label>Title</label>
          <input 
            type='text'
            placeholder="Enter the title of your article"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required 
            />
        </div>
  
        <div>
          <label>Describe your problem</label>
          <textarea
            placeholder="Write your article here" 
            rows={7}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
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
        <button type="submit" >Post</button>
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


export default Question;
  