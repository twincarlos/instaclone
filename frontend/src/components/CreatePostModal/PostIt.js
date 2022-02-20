import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOnePost } from '../../store/post';

import './CreatePostModal.css';

function PostIt({ image, setImage, setShowModal, postImageUrl }) {
    const dispatch = useDispatch();
    const [caption, setCaption] = useState('');
    const sessionUser = useSelector((state) => state.session.user);

    const handleSubmit = () => {
        const newPost = {
            userId: sessionUser.id,
            postImageUrl,
            caption
        }

        setImage(null);
        setShowModal(false);
        dispatch(createOnePost(newPost));
    }

    return (
        <div id='post-it-modal'>
            <div id='header'>
                <button><i className="fas fa-arrow-left"></i></button>
                <h1>Create new post</h1>
                <button onClick={handleSubmit}>Share</button>
            </div>
            <div id='body'>
                <img src={image} alt=''></img>
                <div>
                    <span id='owner-of-post'>
                        <img src={sessionUser.profileImageUrl} alt=''></img>
                        <p>arianagrande</p>
                    </span>
                    <textarea placeholder='Write a caption...' onChange={(e) => setCaption(e.target.value)}></textarea>
                    <span id='smile-span'>
                        <i className="far fa-smile"></i>
                        <p>{caption.length} / 250</p>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PostIt;
