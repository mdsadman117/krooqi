import * as types from './../constants/actionTypes';
import initialState from './initialState';

export default (state = initialState.properties, action) => {
    switch (action.type) {
        case types.LOAD_PROPERTIES_REQUEST:
            return { ...state, loading: true };
        case types.LOAD_PROPERTIES_SUCCESS:
            return { ...state, loading: false, success: action.properties };
        case types.LOAD_PROPERTIES_FAIL:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};