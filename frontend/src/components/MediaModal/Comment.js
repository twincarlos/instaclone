import { NavLink } from 'react-router-dom';

import './MediaModal.css';

function Comment({ comment, user, userImage, time, commentLikes }) {
    return (
        <div className='comment-user'>
            <div className='comment-user-image'>
                <NavLink to='/users/1'><img src={userImage} alt=''></img></NavLink>
            </div>
            <div className='comment-user-body'>
                <span className='comment-user-span'>
                    <NavLink to='/users/1'>{user}</NavLink>
                    <p>{comment}</p>
                </span>
                <span className='comment-user-likes'>
                    <p>{time}</p>
                    <p className='comment-likes-p'>{commentLikes}</p>
                </span>
            </div>
            <i className="far fa-heart"></i>
        </div>
    );
}

export default Comment;
