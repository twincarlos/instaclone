import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StoryHighlights from '../StoryHighlights';

import './UserPage.css';

function UserPage () {
    const userId = useParams().id;
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div>
            <div id='user-header'>
                <img src='https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg' alt=''></img>
                <div>
                    <div id='user-header-top'>
                        <h1>arianagrande</h1>
                        {
                            (sessionUser && sessionUser?.id === Number(userId))
                            ?
                            <span>
                                <button type='submit'>Edit Profile</button>
                                <i className="fas fa-cog"></i>
                            </span>
                            :
                            <span className='not-my-profile'>
                                <button type='submit'>Follow</button>
                                <i className="fas fa-ellipsis-h"></i>
                            </span>
                        }
                    </div>
                    <div id='user-header-middle'>
                        <p><b>4,936</b> posts</p>
                        <p><b>294m</b> followers</p>
                        <p><b>958</b> following</p>
                    </div>
                    <div id='user-header-bottom'>
                        <p><b>Ariana Grande</b></p>
                        <a target="_blank" rel="noreferrer" href='https://rembeauty.com/'>rembauty.com</a>
                        <p id='followed-by'>Followed by <b>username</b>, <b>username</b>, <b>username</b> +158 more</p>
                    </div>
                </div>
            </div>
            <StoryHighlights />
            <ul id='gallery-ul'>
                <NavLink to={`/users/${userId}`} className='selected'><i className="fas fa-border-all"></i> POSTS</NavLink>
                <NavLink to={`/users/${userId}`}><i className="fas fa-video"></i> REELS</NavLink>
                <NavLink to={`/users/${userId}`}><i className="far fa-play-circle"></i> VIDEOS</NavLink>
                <NavLink to={`/users/${userId}`}><i className="fas fa-user-tag"></i> TAGGED</NavLink>
            </ul>
        </div>
    );
}

export default UserPage;
