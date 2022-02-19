import Post from './Post';

import './PostsGallery.css';

function PostsGallery({ postList, owner }) {
    if (!postList) return null;

    return (
        <div id='posts-gallery'>
            { postList.map((post) => <Post key={(post.id).toString()} post={post} owner={owner}/>) }
        </div>
    );
}

export default PostsGallery;
