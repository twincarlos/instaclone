import Post from './Post';

import './PostsGallery.css';

function PostsGallery({ postList }) {
    if (!postList) return null;

    return (
        <div id='posts-gallery'>
            { postList.map((post) => <Post key={(post.post.id).toString()} post={post}/>) }
        </div>
    );
}

export default PostsGallery;
