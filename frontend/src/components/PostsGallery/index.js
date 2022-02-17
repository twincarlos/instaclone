import Post from './Post';

import './PostsGallery.css';

function PostsGallery({ posts }) {
    return (
        <div id='posts-gallery'>
            {posts.map((post, idx) => <Post key={idx.toString()} post={post}/>)}
        </div>
    );
}

export default PostsGallery;
