import { csrfFetch } from "./csrf";

const FOLLOWERS = 'follow/FOLLOWERS';
const FOLLOW_USER = 'follow/FOLLOW_USER';
const UNFOLLOW_USER = 'follow/UNFOLLOW_USER';

const myFollowers = (followers) => {
    return {
        type: FOLLOWERS,
        followers
    }
}

const followUser = (follow) => {
    return {
        type: FOLLOW_USER,
        follow
    }
}

const unfollowUser = (unfollow) => {
    return {
        type: UNFOLLOW_USER,
        unfollow
    }
}

export const getFollowers = (followeeId) => async dispatch => {
    const response = await csrfFetch(`/api/follows/followers/${followeeId}`);

    const followers = await response.json();
    dispatch(myFollowers(followers));
    return followers;
}

export const followOneUser = (data) => async dispatch => {
    const response = await csrfFetch('/api/follows', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const follow = await response.json();
    dispatch(followUser(follow));
    return follow;
}


export const unfollowOneUser = (data) => async dispatch => {
    const response = await csrfFetch('/api/follows', {
        method: 'DELETE',
        body: JSON.stringify(data)
    });

    const unfollow = await response.json();
    dispatch(unfollowUser(unfollow));
    return unfollow;
}
const initialState = {};

const followsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOWERS: {
            return { ...state, followers: action.followers };
        }
        case FOLLOW_USER: {
            return { ...state, follow: action.follow };
        }
        case UNFOLLOW_USER: {
            return { ...state, unfollow: action.unfollow };
        }
        default:
            return state;
    }
}

export default followsReducer;
