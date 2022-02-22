import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Modal } from '../../context/Modal';
import MediaModal from '../MediaModal';
import { likeOneHomePost, unlikeOneHomePost } from '../../store/post';

import './HomeContent.css';

function MediaWidget({ media, idx }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const likes = useSelector((state) => state.post.homeList[idx].likes)
    const [input, setInput] = useState('');
    const [showMainModal, setShowMainModal] = useState(false);

    const POSTS = ['https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg',
                'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg',
                'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg'];

    return (
        <div className='media-widget'>
            <div className='media-header'>
                <div>
                    <NavLink to={`/users/${media.user.id}`}><img src={media.user.profileImageUrl} alt=''></img></NavLink>
                </div>
                <NavLink to={`/users/${media.user.id}`}><p>{media.user.username}</p></NavLink>
                <i className="fas fa-ellipsis-h"></i>
            </div>
            <img src={media.post.postImageUrl} alt=''></img>
            <div className='interaction-section'>
                <div className='icons-section'>
                    { (likes.find((like) => like.id === sessionUser.id) ?
                            <i onClick={() => dispatch(unlikeOneHomePost({ postId: media.post.id, userId: sessionUser.id }))} className="fas fa-heart liked"></i>
                            :
                            <i onClick={() => dispatch(likeOneHomePost({ postId: media.post.id, userId: sessionUser.id }))} className="far fa-heart"></i>)
                     }
                    <i className="far fa-comment" onClick={() => setShowMainModal(true)}></i>
                    <i className="far fa-paper-plane"></i>
                    <i className="far fa-bookmark"></i>
                </div>
                <div className='who-liked-it'>
                    <div className='users-bubbles'>
                        { POSTS.map((post, idx) => <div className={`bubble${idx}`} key={idx.toString()}><img src={post} alt=''></img></div>) }
                    </div>
                    <p>Liked by <b>username</b> and <b>45,956 others</b></p>
                </div>
                <div className='user-caption'>
                    <NavLink to={`/users/${media.user.id}`}><p>{media.user.username}</p></NavLink>
                    <p>{media.post.caption}</p>
                </div>
                <p className='view-all-comments'>View all 994 comments</p>
                <div className='most-recent-comments'>
                    <p><b>twincarloss</b> yes baby, you are</p>
                    <p><b>twincarloss</b> how gorgeous, my love</p>
                </div>
                <p className='time-posted'>6 HOURS AGO</p>
            </div>
            <div className='add-comment-section'>
                <i className="far fa-smile"></i>
                <form>
                    <input type='text' placeholder='Add a comment...' onChange={(e) => setInput(e.target.value)}></input>
                    <button type='submit' disabled={!input.length} className={input.length ? 'can-comment' : null}>Post</button>
                </form>
            </div>
            {
                showMainModal && (
                    <Modal onClose={() => setShowMainModal(false)}>
                        <MediaModal post={media.post} owner={media.user} setShowMainModal={setShowMainModal}/>
                    </Modal>
                )
            }
        </div>
    );
}

export default MediaWidget;
