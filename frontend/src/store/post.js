import { csrfFetch } from "./csrf";
const GET_ALL_POSTS_BY_USERID = 'posts/GET_ALL_POSTS_BY_USER_ID';
const EDIT_POST = 'posts/EDIT_POST';
const GET_POST_BY_ID = 'posts/GET_POST_BY_ID';

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

const editPost = (newPost) => {
    return {
        type: EDIT_POST,
        newPost
    }
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

export const editOnePost = (data) => async (dispatch) => {
    const response = await csrfFetch('/api/posts', {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const newPost = await response.json();
    dispatch(editPost(newPost));
    return newPost;
}

const initialState = {};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS_BY_USERID: {
            const newState = { ...state, postList: action.postList };
            return newState;
        }
        case GET_POST_BY_ID: {
            const newState = { ...state, post: action.post };
            return newState;
        }
        case EDIT_POST: {
            const newPost = action.newPost;
            state.postList = state.postList.map((post) => post.id === newPost.id ? newPost : post);
            const newState = { ...state };
            return newState;
        }
        default:
            return state;
    }
}

export default postsReducer;
