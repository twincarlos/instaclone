import { csrfFetch } from "./csrf";

const GET_LIKES_FROM_POST = 'like/GET_LIKES_FROM_POST';
const LIKE = 'like/LIKE';
const UNLIKE = 'like/UNLIKE';

const getLikesFromPost = (likes) => {
    return {
        type: GET_LIKES_FROM_POST,
        likes
    }
}

const like = (newLiker) => {
    return {
        type: LIKE,
        newLiker
    }
}

const unlike = (oldLiker) => {
    return {
        type: UNLIKE,
        oldLiker
    }
}

export const getAllLikesFromPost = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/${postId}`);

    const likes = await response.json();
    dispatch(getLikesFromPost(likes));
    return likes;
}

export const likeAPost = (liker) => async dispatch => {
    const response = await csrfFetch('/api/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(liker)
    });

    const newLiker = await response.json();
    dispatch(like(newLiker));
    return newLiker;
}

export const unlikeAPost = (unliker) => async dispatch => {
    const response = await csrfFetch('/api/likes', {
        method: 'DELETE',
        body: JSON.stringify(unliker)
    });

    const oldLiker = await response.json();
    dispatch(unlike(oldLiker));
    return oldLiker;
}

const initialState = {};

const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIKES_FROM_POST: {
            return { ...state, likes: action.likes };
        }
        case LIKE: {
            const newLiker = action.newLiker;
            state.likes = [newLiker, ...state.likes];
            return { ...state };
        }
        case UNLIKE: {
            const oldLiker = action.oldLiker;
            state.likes = state.likes.filter((liker) => liker.id !== oldLiker.id);
            return { ...state };
        }
        default:
            return state;
    }
}

export default likesReducer;
