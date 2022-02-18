import { csrfFetch } from "./csrf";

const GET_USER = 'session/getUser';

const getUser = (user) => {
    return {
        type: GET_USER,
        user
    }
}

export const getOneUser = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${id}`);
    const user = await response.json();
    dispatch(getUser(user));
    return user;
}

const initialState = {};

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER:
            newState = { ...state, user: action.user }
            return newState;
        default:
            return state;
    }
}

export default userReducer;
