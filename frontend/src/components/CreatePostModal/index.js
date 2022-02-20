import { useState, useEffect } from 'react';
// import { Modal } from '../../context/Modal';
import PostIt from './PostIt';
import photosAndVideos from '../../assets/photos-and-videos.png';

import './CreatePostModal.css'

function CreatePostModal ({ setShowModal }) {
    const [postImageUrl, setPostImageUrl] = useState(null);
    const [showPostIt, setShowPostIt] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (image) {
            setShowPostIt(true);
        }
    }, [image]);

    const handleUpload = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const fileReader = new FileReader();

        setPostImageUrl(file);
        fileReader.onload = () => setImage(fileReader.result);
        fileReader.readAsDataURL(file);
    }

    return (
        showPostIt ? <PostIt image={image} setImage={setImage} setShowModal={setShowModal} postImageUrl={postImageUrl}/> :
        <div id='create-post-modal'>
            <h1>Create new post</h1>
            <img src={photosAndVideos} alt=''></img>
            <h2>Drag a photo here</h2>
            <label>
                Select from computer
                <input type='file' onChange={handleUpload} />
            </label>
        </div>
    );
}

export default CreatePostModal;
