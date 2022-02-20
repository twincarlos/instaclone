import { csrfFetch } from "./csrf";
const GET_ALL_POSTS_BY_USERID = 'posts/GET_ALL_POSTS_BY_USER_ID';
const GET_POST_BY_ID = 'posts/GET_POST_BY_ID';
const CREATE_POST = 'posts/CREATE_POST';
const EDIT_POST = 'posts/EDIT_POST';
const DELETE_POST = 'posts/DELETE_POST';

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
        default:
            return state;
    }
}

export default postsReducer;
