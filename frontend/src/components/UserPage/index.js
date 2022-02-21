import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import StoryHighlights from '../StoryHighlights';
import PostsGallery from '../PostsGallery';

import { getOneUser } from '../../store/user';
import { getAllPostsByUserId } from '../../store/post';
import { getAllTheirFollowers, getAllTheirFollowings, getAllMyFollowings, followOneUser, unfollowOneUser } from '../../store/follow';

import './UserPage.css';

function UserPage () {
    const dispatch = useDispatch();
    const userId = useParams().id;
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.user.user?.user);
    const postList = useSelector(state => state.post.postList);
    const theirFollowers = useSelector(state => state.follow.theirFollowers);
    // const myFollowers = useSelector(state => state.follow.myFollowers);
    const theirFollowings = useSelector(state => state.follow.theirFollowings);
    const myFollowings = useSelector(state => state.follow.myFollowings);
    const [showModal, setShowModal] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);

    useEffect(() => {
        dispatch(getOneUser(userId));
        dispatch(getAllPostsByUserId(userId));
        dispatch(getAllTheirFollowers(userId));
        dispatch(getAllTheirFollowings(userId));
        if (sessionUser) dispatch(getAllMyFollowings(sessionUser.id));
    }, [dispatch, userId, sessionUser]);

    if (!user) return null;

    const handleFollow = () => {
        return dispatch(followOneUser({ followerId: sessionUser.id, followeeId: user.id }));
    }

    const handleUnfollow = () => {
        setShowModal(false);
        return dispatch(unfollowOneUser({ followerId: sessionUser.id, followeeId: user.id }));
    }

    const ari = ['https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg',
                'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg',
                'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg',
                'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg'];

    return (
        <div>
            <div id='user-header'>
                <img src={user.profileImageUrl} alt=''></img>
                <div>
                    <div id='user-header-top'>
                        <h1>{user.username}</h1>
                        {
                            (sessionUser && sessionUser?.id === Number(userId))
                            ?
                            <span>
                                <button type='submit'>Edit Profile</button>
                                <i className="fas fa-cog"></i>
                            </span>
                            :
                            <span>
                                {
                                    ((sessionUser) && (theirFollowers?.find((follower) => follower.id === sessionUser.id))) ?
                                        <button onClick={() => setShowModal(true)}>Unfollow</button>
                                        :
                                        <button className='not-my-profile' onClick={handleFollow}>Follow</button>
                                }
                                <i className="fas fa-ellipsis-h"></i>
                            </span>
                        }
                    </div>
                    <div id='user-header-middle'>
                        <p><b>{postList?.length}</b> posts</p>
                        <p id='followers-number' onClick={() => setShowFollowers(true)}><b>{theirFollowers?.length}</b> followers</p>
                        <p id='following-number'><b>{theirFollowings?.length}</b> following</p>
                    </div>
                    <div id='user-header-bottom'>
                        <p><b>{user.username}</b></p>
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
            <div id='posts-gallery'>
                <PostsGallery postList={postList} owner={user}/>
            </div>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <div id='unfollow-modal'>
                            <img src={user.profileImageUrl} alt=''></img>
                            <p>Unfollow @{user.username}?</p>
                            <span>
                                <button id='unfollow-button-modal' onClick={handleUnfollow}>Unfollow</button>
                                <button onClick={() => setShowModal(false)}>Cancel</button>
                            </span>
                        </div>
                    </Modal>
                )
            }
            {
                showFollowers && (
                    <Modal onClose={() => setShowFollowers(false)}>
                        <div id='followers-modal'>
                            <span>
                                <p>Followers</p>
                                <i className="fas fa-times" onClick={() => setShowFollowers(false)}></i>
                            </span>
                            <ul>
                                { theirFollowers.map((follower) => <li key={follower.id.toString()}>
                                    <div id='left-follower'>
                                        <NavLink to={`/users/${follower.id}`}><img src={follower.profileImageUrl} alt=''></img></NavLink>
                                        <span>
                                            <span className={sessionUser?.id.toString() === userId ? null : 'not-my-ig'}>
                                                <NavLink to={`/users/${follower.id}`}>{follower.username}</NavLink>
                                                {
                                                    (sessionUser?.id.toString() === userId) &&
                                                    (myFollowings?.find((following) => following.id === follower.id) ?
                                                        <p onClick={() => dispatch(unfollowOneUser({ followerId: sessionUser.id, followeeId: follower.id }))} className='unfollow-p'><i className="fas fa-circle"></i>Unfollow</p>
                                                        :
                                                        <p onClick={() => dispatch(followOneUser({ myFollower: true, followerId: sessionUser.id, followeeId: follower.id }))} className='follow-p'><i className="fas fa-circle"></i>Follow</p>)
                                                }
                                            </span>
                                            <p>{follower.username}</p>
                                        </span>
                                    </div>
                                    <div id='right-follower'>
                                        {
                                            sessionUser?.id === Number(userId) ?
                                                <button onClick={() => dispatch(unfollowOneUser({ followerId: follower.id, followeeId: sessionUser.id }))} className='remove-follower-button'>Remove</button>
                                                :
                                                (
                                                    sessionUser?.id === follower.id ? null :
                                                    (myFollowings?.find((following) => following.id === follower.id) ?
                                                        ((<button onClick={() => dispatch(unfollowOneUser({ thirdPartyFollower: true, followerId: sessionUser.id, followeeId: follower.id }))} className='unfollow-follower-button'>Unfollow</button>))
                                                        :
                                                        ((sessionUser?.id === follower.id) ? null : (<button onClick={() => dispatch(followOneUser({ thirdPartyFollower: true, followerId: sessionUser.id, followeeId: follower.id }))} className='follow-follower-button'>Follow</button>)))
                                                )
                                        }
                                    </div>
                                </li>) }
                            </ul>
                        </div>
                    </Modal>
                )
            }
        </div>
    );
}

export default UserPage;
