import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './MediaModal.css';

function MediaModal({ media }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='media-modal-div'>
            <img src={media} alt=''></img>
            <div className='comments-section'>
                <ul>
                    <li>
                        <div>
                            <NavLink to='/users/1'><img src='https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg' alt=''></img></NavLink>
                        </div>
                        <span>
                            <NavLink to='/users/1'>arianagrande</NavLink>{((sessionUser?.id !== 1) && (<><i className="fas fa-circle"></i><button>Follow</button></>))}<i className="fas fa-ellipsis-h"></i>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default MediaModal;
