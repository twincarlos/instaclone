import { NavLink } from 'react-router-dom';

import './MediaModal.css';

function Comment({ comment, user, userImage, time, commentLikes }) {
    return (
        <div class='comment-user'>
            <div class='comment-user-image'>
                <NavLink to='/users/1'><img src={userImage} alt=''></img></NavLink>
            </div>
            <div class='comment-user-body'>
                <span class='comment-user-span'>
                    <NavLink to='/users/1'>{user}</NavLink>
                    <p>{comment}</p>
                </span>
                <span class='comment-user-likes'>
                    <p>{time}</p>
                    <p className='comment-likes-p'>{commentLikes}</p>
                </span>
            </div>
            <i className="far fa-heart"></i>
        </div>
    );
}

export default Comment;
