import * as type from '../actions/actionTypes';

export default function authorReducer(state = [], action){
    switch(action.type){
        case type.LOAD_AUTHORS_SUCCESS:
            return action.authors;
        default:
            return state;    
    }
}