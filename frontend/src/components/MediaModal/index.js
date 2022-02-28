import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { getAllMyFollowings } from '../../store/follow';
import { editOnePost, deleteOnePost, likeOnePost, unlikeOnePost } from '../../store/post';
// import { getAllLikesFromPost, likeAPost, unlikeAPost } from '../../store/like';

import './MediaModal.css';

function MediaModal({ post, setShowMainModal, idx }) {
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const myFollowings = useSelector(state => state.follow.myFollowings);
    // let homeLikes = useSelector(state => state.post.homeList);
    // let likes = useSelector(state => state.like.likes);
    const [input, setInput] = useState('');
    const [caption, setCaption] = useState(post.post.caption);

    // if (homeLikes) likes = homeLikes[idx].likes;

    useEffect(() => {
        if (sessionUser) dispatch(getAllMyFollowings(sessionUser.id));
        // dispatch(getAllLikesFromPost(post.id));
    }, [dispatch, sessionUser]);

    if (!post) return null;

    const handleEdit = (e) => {
        e.preventDefault();
        setShowEdit(false);
        setShowModal(false);
        return dispatch(editOnePost({ id: post.post.id, caption }));
    }

    const handleDelete = () => {
        setShowDelete(false);
        setShowModal(false);
        setShowMainModal(false);
        return dispatch(deleteOnePost({ id: post.post.id }));
    }

    return (
        <div className='media-modal-div'>
            <img src={post.post.postImageUrl} alt=''></img>
            <div className='comments-section'>
                <ul>
                    <li className='author-li'>
                        <div className='author-profile-image'>
                            <NavLink to={`/users/${post.user.id}`}><img src={post.user.profileImageUrl} alt=''></img></NavLink>
                        </div>
                        <span>
                            <NavLink to={`/users/${post.user.id}`}>{post.user.username}</NavLink>{((sessionUser?.id !== post.user.id) && (myFollowings?.find((follower) => follower.id === post.user.id) ? null : (<><i className="fas fa-circle"></i><button>Follow</button></>)) )}<i className="fas fa-ellipsis-h" onClick={() => setShowModal(true)}></i>
                        </span>
                    </li>
                    <ul className='all-user-comments'>
                        <li>{ post.post.caption }</li>
                    </ul>
                    <li className='user-input-section'>
                        <div className='interaction-icons'>
                            {
                                post.likes.find((like) => like.userId === sessionUser.id) ?
                                    <i onClick={() => { dispatch(unlikeOnePost({ postId: post.post.id, userId: sessionUser.id }))}} className="fas fa-heart liked"></i>
                                    :
                                    <i onClick={() => { dispatch(likeOnePost({ postId: post.post.id, userId: sessionUser.id }))}} className="far fa-heart"></i>
                            }
                            <i className="far fa-comment"></i>
                            <i className="far fa-paper-plane"></i>
                            <i className="far fa-bookmark"></i> </div>
                        <div className='who-has-liked'>
                            {post.likes.length ? <div>
                                {post.likes.map((like, idx) => (like && idx < 3) ? (<div className={`user-like-bubble bubble${idx.toString()}`} key={like.id.toString()}><img src={like.profileImageUrl} alt=''></img></div>) : null) }
                                <p>Liked by <NavLink to={`/users/${post.likes[0].id}`}>{post.likes[0].username}</NavLink>{(post.likes.length > 1) ? ` and ${post.likes.length - 1} others` : null }</p>
                            </div> : null }
                        </div>
                        <div className='time-posted'>
                            <p>3 DAYS AGO</p>
                        </div>
                    </li>
                    <li className='add-a-comment-li'>
                        <i className="far fa-smile"></i>
                        <form>
                            <input type='text' placeholder='Add a comment...' value={input} onChange={(e) => setInput(e.target.value)}></input>
                            <button type='submit' disabled={!input.length} className={input.length ? 'can-comment' : null}>Post</button>
                        </form>
                    </li>
                </ul>
            </div>
            {
                showModal && (
                    sessionUser?.id === post.user.id ? (
                    <Modal onClose={() => setShowModal(false)}>
                        {
                            showEdit ?
                                <div id='edit-post-modal'>
                                    <h1>Edit</h1>
                                    <form onSubmit={handleEdit}>
                                        <textarea defaultValue={post.post.caption} onChange={(e) => setCaption(e.target.value)}></textarea>
                                        <button type='submit'>Submit</button>
                                    </form>
                                    <button onClick={() => {
                                        setShowEdit(false);
                                        setShowModal(true);
                                        setCaption(post.post.caption);
                                    }}>Cancel</button>
                                </div>
                            :
                            showDelete ?
                                <div id='delete-post-modal'>
                                    <p id='delete-post-p'>Delete Post?</p>
                                    <p id='are-you-sure-p'>Are you sure you want to delete this post?</p>
                                    <button id='delete-sure-button' onClick={handleDelete}>Delete</button>
                                    <button onClick={() => {
                                        setShowDelete(false);
                                        setShowModal(true);
                                    }}>Cancel</button>
                                </div>
                            :
                            <div id='delete-edit-cancel-modal'>
                                <button id='delete-post-button' onClick={() => {
                                    setShowDelete(true);
                                }}>Delete</button>
                                <button onClick={() => {
                                    setShowEdit(true);
                                }}>Edit</button>
                                <button id='cancel-post-button' onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        }
                    </Modal>
                ) : <h1>not your post!</h1>)
            }
        </div>
    );
}

export default MediaModal;
