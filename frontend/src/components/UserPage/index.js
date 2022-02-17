import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StoryHighlights from '../StoryHighlights';
import PostsGallery from '../PostsGallery';

import './UserPage.css';

function UserPage () {
    const userId = useParams().id;
    const sessionUser = useSelector(state => state.session.user);

    const ari = ['https://assets.teenvogue.com/photos/613b5fd248eda7f19679403c/4:3/w_1999,h_1499,c_limit/1235152164',
                'https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952',
                'https://www.refinery29.com/images/10556884.jpg?format=pjpg&auto=webp&resize-filter=lanczos2&quality=65&sharpen=a3%2Cr3%2Ct0&optimize=low&width=1200&height=1200&crop=1%3A1%2Csmart&enable=upscale',
                'https://data.whicdn.com/images/325491319/original.jpg'];

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
                            <span>
                                <button className='not-my-profile' type='submit'>Follow</button>
                                <i className="fas fa-ellipsis-h"></i>
                            </span>
                        }
                    </div>
                    <div id='user-header-middle'>
                        <p><b>4,936</b> posts</p>
                        <p id='followers-number'><b>294m</b> followers</p>
                        <p id='following-number'><b>958</b> following</p>
                    </div>
                    <div id='user-header-bottom'>
                        <p><b>Ariana Grande</b></p>
                        <a target="_blank" rel="noreferrer" href='https://rembeauty.com/'>rembauty.com</a>
                        <p id='followed-by'>Followed by <b>username</b>, <b>username</b>, <b>username</b> +158 more</p>
                    </div>
                </div>
            </div>
            <StoryHighlights stories={ari} />
            <ul id='gallery-ul'>
                <NavLink to={`/users/${userId}`} className='selected'><i className="fas fa-border-all"></i> POSTS</NavLink>
                <NavLink to={`/users/${userId}`}><i className="fas fa-video"></i> REELS</NavLink>
                <NavLink to={`/users/${userId}`}><i className="far fa-play-circle"></i> VIDEOS</NavLink>
                <NavLink to={`/users/${userId}`}><i className="fas fa-user-tag"></i> TAGGED</NavLink>
            </ul>
            <PostsGallery posts={ari}/>
        </div>
    );
}

export default UserPage;
