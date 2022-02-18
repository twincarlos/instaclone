import { csrfFetch } from "./csrf";
const GET_ALL_POSTS_BY_USERID = 'posts/GET_ALL_POSTS_BY_USER_ID';

const allPostsByUserId = (postList) => {
    return {
        type: GET_ALL_POSTS_BY_USERID,
        postList
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

const initialState = {};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS_BY_USERID: {
            const newState = { ...state, postList: action.postList };
            return newState;
        }
        default:
            return state;
    }
}

export default postsReducer;
