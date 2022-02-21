import { csrfFetch } from "./csrf";

const FOLLOWERS = 'follow/FOLLOWERS';
const THEIR_FOLLOWINGS = 'follow/THEIR_FOLLOWINGS';
const MY_FOLLOWINGS = 'follow/MY_FOLLOWINGS';
const FOLLOW_USER = 'follow/FOLLOW_USER';
const UNFOLLOW_USER = 'follow/UNFOLLOW_USER';

const myFollowers = (followers) => {
    return {
        type: FOLLOWERS,
        followers
    }
}

const getTheirFollowings = (theirFollowings) => {
    return {
        type: THEIR_FOLLOWINGS,
        theirFollowings
    }
}

const getMyFollowings = (myFollowings) => {
    return {
        type: MY_FOLLOWINGS,
        myFollowings
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

export const getAllTheirFollowings = (followerId) => async dispatch => {
    const response = await csrfFetch(`/api/follows/theirFollowings/${followerId}`);

    const theirFollowings = await response.json();
    dispatch(getTheirFollowings(theirFollowings));
    return theirFollowings;
}

export const getAllMyFollowings = (followerId) => async dispatch => {
    const response = await csrfFetch(`/api/follows/myFollowings/${followerId}`);

    const myFollowings = await response.json();
    dispatch(getMyFollowings(myFollowings));
    return myFollowings;
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
        case THEIR_FOLLOWINGS: {
            return { ...state, theirFollowings: action.theirFollowings };
        }
        case MY_FOLLOWINGS: {
            return { ...state, myFollowings: action.myFollowings };
        }
        case FOLLOW_USER: {
            const newFollower = action.newFollower;
            state.followers = [newFollower, ...state.followers];
            state.myFollowings = [newFollower, ...state.myFollowings];
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
