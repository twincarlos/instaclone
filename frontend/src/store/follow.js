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

const followUser = (newFollower) => {
    return {
        type: FOLLOW_USER,
        newFollower
    }
}

const unfollowUser = (oldFollower) => {
    return {
        type: UNFOLLOW_USER,
        oldFollower
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

    const newFollower = await response.json();
    dispatch(followUser(newFollower));
    return newFollower;
}


export const unfollowOneUser = (data) => async dispatch => {
    const response = await csrfFetch('/api/follows', {
        method: 'DELETE',
        body: JSON.stringify(data)
    });

    const oldFollower = await response.json();
    dispatch(unfollowUser(oldFollower));
    return oldFollower;
}

const initialState = {};

const followsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOWERS: {
            return { ...state, followers: action.followers };
        }
        case FOLLOW_USER: {
            const newFollower = action.newFollower;
            state.followers = [newFollower, ...state.followers];
            return { ...state };
        }
        case UNFOLLOW_USER: {
            const oldFollower = action.oldFollower;
            state.followers = state.followers.filter((follower) => follower.id !== oldFollower.id);
            return { ...state };
        }
        default:
            return state;
    }
}

export default followsReducer;
