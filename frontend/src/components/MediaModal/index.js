import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import { editOnePost, deleteOnePost } from '../../store/post';

import './MediaModal.css';

function MediaModal({ post, owner, setShowMainModal }) {
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [input, setInput] = useState('');
    const [caption, setCaption] = useState(post?.caption);

    const bubbles = ['https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg', 'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg', 'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg']

    if (!post) return null;

    const handleEdit = (e) => {
        e.preventDefault();
        setShowEdit(false);
        setShowModal(false);
        return dispatch(editOnePost({ id: post.id, caption }));
    }

    const handleDelete = () => {
        setShowDelete(false);
        setShowModal(false);
        setShowMainModal(false);
        return dispatch(deleteOnePost({ id: post.id }));
    }

    return (
        <div className='media-modal-div'>
            <img src={post.postImageUrl} alt=''></img>
            <div className='comments-section'>
                <ul>
                    <li className='author-li'>
                        <div className='author-profile-image'>
                            <NavLink to={`/users/${owner.id}`}><img src={owner.profileImageUrl} alt=''></img></NavLink>
                        </div>
                        <span>
                            <NavLink to={`/users/${owner.id}`}>{owner.username}</NavLink>{((sessionUser?.id !== owner.id) && (<><i className="fas fa-circle"></i><button>Follow</button></>))}<i className="fas fa-ellipsis-h" onClick={() => setShowModal(true)}></i>
                        </span>
                    </li>
                    <ul className='all-user-comments'>
                        <li>{ post.caption }</li>
                    </ul>
                    <li className='user-input-section'>
                        <div className='interaction-icons'>
                            <i className="far fa-heart"></i>
                            <i className="far fa-comment"></i>
                            <i className="far fa-paper-plane"></i>
                            <i className="far fa-bookmark"></i>
                        </div>
                        <div className='who-has-liked'>
                            <div>
                                { bubbles.map((bubble, idx) => (idx < 3) && (<div className={`user-like-bubble bubble${idx.toString()}`} key={idx.toString()}><img src={bubble} alt=''></img></div>)) }
                                <p>Liked by <NavLink to='/users/1'>username</NavLink> and <b>6,245,252 others</b></p>
                            </div>
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
                    sessionUser?.id === owner.id ? (
                    <Modal onClose={() => setShowModal(false)}>
                        {
                            showEdit ?
                                <div id='edit-post-modal'>
                                    <h1>Edit</h1>
                                    <form onSubmit={handleEdit}>
                                        <textarea defaultValue={post.caption} onChange={(e) => setCaption(e.target.value)}></textarea>
                                        <button type='submit'>Submit</button>
                                    </form>
                                    <button onClick={() => {
                                        setShowEdit(false);
                                        setShowModal(true);
                                        setCaption(post.caption);
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
