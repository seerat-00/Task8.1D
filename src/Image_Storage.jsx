import React, {useState} from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import exportfirebase from "./firebase";

const Image = () => {
    const[image, setImage] = useState(null)
    const[error, setError] = useState('')


    const handleImageChange = (e) => {
        e.preventDefault();
        
        const selectFile = e.target.files[0];

        if(selectFile){
            if(selectFile.type === 'image/jpeg' || selectFile.type === 'image/jpg' || selectFile.type === 'image/png'){
                setImage(selectFile);
            }
            else{
                setError('Please enter a valid image file, that is .jpg, .png, .jpeg')
                setImage(null)
            }
        }
    };
    
    const handleimageUpload = async () => {
        if(!image){
            console.log('No file selected');
            return;
        }

        const imageRef = ref(exportfirebase.imageUpload, `images/${image.name}`)

        try{
            const snapshot = await uploadBytes(imageRef, image)
            if(snapshot){
                const url = await(getDownloadURL)(snapshot.ref)
                console.log('File uploaded successfully', url)
                alert('File uploaded successfully')
            }
            else{
                setError('Error in uploading the file')
            }
        }
        catch(error){
            setError('Error in uploading the file')
        }
    };

    return(
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleimageUpload}>Upload </button>
            {error && <p style={{color:'red'}}>{error} </p>}
        </div>
    )
}

export default Image;