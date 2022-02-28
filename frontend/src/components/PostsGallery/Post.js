import { useState } from 'react';
import { Modal } from '../../context/Modal';
import MediaModal from '../MediaModal';

import './PostsGallery.css';

function Post({ post }) {
    const [showMainModal, setShowMainModal] = useState(false);

    return (
        <div>
            <img src={post.post.postImageUrl} alt=''></img>
            <span className='hover-stats' onClick={() => setShowMainModal(true)}>
                <p className='hover-likes'><i className="fas fa-heart"></i> 1.4m</p>
                <p className='hover-comments'><i className="fas fa-comment"></i> 52</p>
            </span>
            {
                showMainModal && (
                    <Modal onClose={() => setShowMainModal(false)}>
                        <MediaModal post={post} setShowMainModal={setShowMainModal}/>
                    </Modal>
                )
            }
        </div>
    );
}

export default Post;
