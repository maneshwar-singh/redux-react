import * as type from '../actions/actionTypes';

export default function courseReducer(state = [], action){
    switch(action.type){
        case type.LOAD_COURSES_SUCCESS:
            return action.courses;
        case type.CREATE_COURSE_SUCCESS:            
            return [
                ...state,
                Object.assign({},action.courses)
            ];
         case type.UPDATE_COURSE_SUCCESS:            
            return [
                ...state.filter(course => course.id !== action.courses.id),
                Object.assign({}, action.courses)
            ];               
        default:
            return state;    
    }
}