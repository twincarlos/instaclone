import { csrfFetch } from "./csrf";
const GET_POSTS_FROM_FOLLOWINGS = 'posts/GET_POSTS_FROM_FOLLOWINGS';
const GET_ALL_POSTS_BY_USERID = 'posts/GET_ALL_POSTS_BY_USER_ID';
const GET_POST_BY_ID = 'posts/GET_POST_BY_ID';
const CREATE_POST = 'posts/CREATE_POST';
const EDIT_POST = 'posts/EDIT_POST';
const DELETE_POST = 'posts/DELETE_POST';
const LIKE_A_POST = 'posts/LIKE_A_POST';
const UNLIKE_A_POST = 'posts/UNLIKE_A_POST';

const allPostsFromFollowings = (postList) => {
    return {
        type: GET_POSTS_FROM_FOLLOWINGS,
        postList
    }
}

const allPostsByUserId = (postList) => {
    return {
        type: GET_ALL_POSTS_BY_USERID,
        postList
    }
}

const getPostById = (post) => {
    return {
        type: GET_POST_BY_ID,
        post
    }
}

const createPost = (newPost) => {
    return {
        type: CREATE_POST,
        newPost
    }
}

const editPost = (postToEdit) => {
    return {
        type: EDIT_POST,
        postToEdit
    }
}

const deletePost = (postToDelete) => {
    return {
        type: DELETE_POST,
        postToDelete
    }
}

const likeAPost = (newLiker) => {
    return {
        type: LIKE_A_POST,
        newLiker
    }
}

const unlikeAPost = (oldLiker) => {
    return {
        type: UNLIKE_A_POST,
        oldLiker
    }
}

export const getAllPostsFromFollowings = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/home/${id}`);
    const postList = await response.json();
    dispatch(allPostsFromFollowings(postList));
    return postList;
}

export const getAllPostsByUserId = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/all/${userId}`);

    if (response.ok) {
        const postList = await response.json();

        dispatch(allPostsByUserId(postList));
        return postList;
    }
}

export const getOnePostById = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${id}`);

    const post = await response.json();
    dispatch(getPostById(post));
    return post;
}

export const createOnePost = (data) => async (dispatch) => {
    const { userId, postImageUrl, caption } = data;
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('postImageUrl', postImageUrl);
    formData.append('caption', caption);

    const response = await csrfFetch('/api/posts', {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    const newPost = await response.json();
    dispatch(createPost(newPost));
    return newPost;
}

export const editOnePost = (data) => async (dispatch) => {
    const response = await csrfFetch('/api/posts', {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const postToEdit = await response.json();
    dispatch(editPost(postToEdit));
    return postToEdit;
}

export const deleteOnePost = (id) => async (dispatch) => {
    const response = await csrfFetch('/api/posts', {
        method: 'DELETE',
        body: JSON.stringify(id)
    })
    const postToDelete = await response.json();
    dispatch(deletePost(postToDelete));
    return postToDelete;
}

export const likeOnePost = (liker) => async dispatch => {
    const response = await csrfFetch('/api/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(liker)
    });

    const newLiker = await response.json();
    dispatch(likeAPost(newLiker));
    return newLiker;
}

export const unlikeOnePost = (unliker) => async dispatch => {
    const response = await csrfFetch('/api/likes', {
        method: 'DELETE',
        body: JSON.stringify(unliker)
    });

    const oldLiker = await response.json();
    dispatch(unlikeAPost(oldLiker));
    return oldLiker;
}

const initialState = {};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_FROM_FOLLOWINGS: {
            const newState = { ...state, postList: action.postList };
            return newState;
        }
        case GET_ALL_POSTS_BY_USERID: {
            const newState = { ...state, postList: action.postList };
            return newState;
        }
        case GET_POST_BY_ID: {
            const newState = { ...state, post: action.post };
            return newState;
        }
        case CREATE_POST: {
            const newPost = action.newPost;
            state.postList = [newPost, ...state.postList];
            const newState = { ...state };
            return newState;
        }
        case EDIT_POST: {
            const postToEdit = action.postToEdit;
            state.postList.map((post) => post.id === postToEdit.id ? postToEdit : post);
            const newState = { ...state };
            return newState;
        }
        case DELETE_POST: {
            const postToDelete = action.postToDelete;
            state.postList = state.postList.filter((post) => post.id !== postToDelete.id);
            const newState = { ...state };
            return newState;
        }
        case LIKE_A_POST: {
            const newLiker = action.newLiker.user;
            const postId = action.newLiker.like.postId;
            state.postList = state.postList.map((post) => (post.post.id === postId) ? { user: post.user, post: post.post, likes: [newLiker, ...post.likes] } : post);
            return { ...state };
        }
        case UNLIKE_A_POST: {
            const oldLiker = action.oldLiker.user;
            const postId = action.oldLiker.like.postId;
            state.postList = state.postList.map((post) => (post.post.id === postId) ? { user: post.user, post: post.post, likes: post.likes.filter((liker) => liker.id !== oldLiker.id) } : post);
            return { ...state };
        }
        default:
            return state;
    }
}

export default postsReducer;
