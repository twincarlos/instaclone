import { csrfFetch } from "./csrf";

const THEIR_FOLLOWERS = 'follow/THEIR_FOLLOWERS';
const MY_FOLLOWERS = 'follow/MY_FOLLOWERS';
const THEIR_FOLLOWINGS = 'follow/THEIR_FOLLOWINGS';
const MY_FOLLOWINGS = 'follow/MY_FOLLOWINGS';
const FOLLOW_USER = 'follow/FOLLOW_USER';
const UNFOLLOW_USER = 'follow/UNFOLLOW_USER';

const getTheirFollowers = (theirFollowers) => {
    return {
        type: THEIR_FOLLOWERS,
        theirFollowers
    }
}

const getMyFollowers = (myFollowers) => {
    return {
        type: MY_FOLLOWERS,
        myFollowers
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

export const getAllTheirFollowers = (followeeId) => async dispatch => {
    const response = await csrfFetch(`/api/follows/theirFollowers/${followeeId}`);

    const theirFollowers = await response.json();
    dispatch(getTheirFollowers(theirFollowers));
    return theirFollowers;
}

export const getAllMyFollowers = (followeeId) => async dispatch => {
    const response = await csrfFetch(`/api/follos/myFollowers/${followeeId}`);

    const myFollowers = await response.json();
    dispatch(getMyFollowers(myFollowers));
    return myFollowers;
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
        case THEIR_FOLLOWERS: {
            return { ...state, theirFollowers: action.theirFollowers };
        }
        case MY_FOLLOWERS: {
            return { ...state, myFollowers: action.myFollowers };
        }
        case THEIR_FOLLOWINGS: {
            return { ...state, theirFollowings: action.theirFollowings };
        }
        case MY_FOLLOWINGS: {
            return { ...state, myFollowings: action.myFollowings };
        }
        case FOLLOW_USER: {
            const newFollower = action.newFollower;
            state.myFollowings = [newFollower.follower, ...state.myFollowings];
            if (!(newFollower.myFollower || newFollower.thirdPartyFollower)) {
                console.log('HERE!');
                state.theirFollowers = [newFollower.follower, ...state.theirFollowers];
            }
            return { ...state };
        }
        case UNFOLLOW_USER: {
            const oldFollower = action.oldFollower;
            state.myFollowings = state.myFollowings.filter((follower) => follower.id !== oldFollower.id);
            if (!oldFollower.thirdPartyFollower) state.theirFollowers = state.theirFollowers.filter((follower) => follower.id !== oldFollower.id);
            return { ...state };
        }
        default:
            return state;
    }
}

export default followsReducer;
