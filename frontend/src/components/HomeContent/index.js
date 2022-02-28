import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllPostsFromFollowings } from '../../store/post';
import MediaWidget from './MediaWidget'

import './HomeContent.css'

// const POSTS = ['https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg',
//                 'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg',
//                 'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg'];


function HomeContent() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const postList = useSelector(state => state.post.postList);

    useEffect(() => {
        dispatch(getAllPostsFromFollowings(sessionUser.id));
    }, [dispatch, sessionUser.id]);

    if (!postList) return null;

    return (
        <div>
            { postList.map((post, idx) => <MediaWidget key={post.post.id.toString()} media={post} idx={idx} />) }
        </div>
    );
}

export default HomeContent;
