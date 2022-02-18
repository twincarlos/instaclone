import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Comment from './Comment';

import './MediaModal.css';

function MediaModal({ media }) {
    const sessionUser = useSelector(state => state.session.user);
    const [input, setInput] = useState('');
    console.log(media)

    const COMMENTS = [
        {user: 'twincarloss', comment: 'i love u', userImage: 'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg', time: '35m', commentLikes: '42 likes'},
        {user: 'little', comment: 'ur incredible', userImage: 'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg', time: '35m', commentLikes: '42 likes'},
        {user: 'bri', comment: 'aw lol praying hands', userImage: 'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg', time: '35m', commentLikes: '42 likes'},
        {user: 'ale q', comment: 'its vevy simple', userImage: 'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg', time: '35m', commentLikes: '42 likes'},
        {user: 'florence', comment: 'un pequeño snack', userImage: 'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg', time: '35m', commentLikes: '42 likes'}
    ];

    return (
        <div className='media-modal-div'>
            <img src={media.postImageUrl} alt=''></img>
            <div className='comments-section'>
                <ul>
                    <li className='author-li'>
                        <div className='author-profile-image'>
                            <NavLink to='/users/1'><img src='https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg' alt=''></img></NavLink>
                        </div>
                        <span>
                            <NavLink to='/users/1'>arianagrande</NavLink>{((sessionUser?.id !== 1) && (<><i className="fas fa-circle"></i><button>Follow</button></>))}<i className="fas fa-ellipsis-h"></i>
                        </span>
                    </li>
                    <ul className='all-user-comments'>
                        { COMMENTS.map((comment, idx) =>  <Comment key={idx.toString()} comment={comment.comment} user={comment.user} userImage={comment.userImage} time={comment.time} commentLikes={comment.commentLikes}/>)}
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
                                { COMMENTS.map((comment, idx) => (idx < 3) && (<div className={`user-like-bubble bubble${idx.toString()}`} key={idx.toString()}><img src={comment.userImage} alt=''></img></div>)) }
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
        </div>
    );
}

export default MediaModal;
