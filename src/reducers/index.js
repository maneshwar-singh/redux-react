import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCalls from './ajaxStatusReducer';

const rootReducer = combineReducers({
    courses,
    authors,
    ajaxCalls
});

export default rootReducer;