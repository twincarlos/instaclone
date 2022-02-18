import { useState } from 'react';
import { Modal } from '../../context/Modal';
import MediaModal from '../MediaModal';

import './PostsGallery.css';

function Post({ post }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <img src={post.postImageUrl} alt=''></img>
            <span className='hover-stats' onClick={() => setShowModal(true)}>
                <p className='hover-likes'><i className="fas fa-heart"></i> 1.4m</p>
                <p className='hover-comments'><i className="fas fa-comment"></i> 52</p>
            </span>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <MediaModal media={post} />
                    </Modal>
                )
            }
        </div>
    );
}

export default Post;
