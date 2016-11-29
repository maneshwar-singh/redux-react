import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import * as courseActions from  '../../actions/courseAction';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component{
    constructor(props, context){
        super(props, context);
        this.redirectToAddCourse = this.redirectToAddCourse.bind(this);
       // this.state = {
         //   course: { title: "" }
        //};
        //Specifically for ES6
        // This binding is necessary in order to have an initialized state
        // Which Could be used in our respective functions
        // Otherwise Functions would keep the state passed "just" from input element not Component
        // Which is undefined by default for elements, hence needs attachment to state
        //this.onTitleChange = this.onTitleChange.bind(this);
        //this.onClickSave = this.onClickSave.bind(this);
    }
    // onTitleChange(event){
    //     const course = this.state.course;
    //     course.title = event.target.value;
    //     this.setState({course: course});
    // }
    // onClickSave(){
    //     console.log(this.state.course);      
    //     this.props.actions.createCourse(this.state.course);
    // }
    courseRow(course, index){
        return <div key={index}>{course.title}</div>;
    }

    redirectToAddCourse(){
        browserHistory.push('/course');
    }
    render() {
        const {courses} = this.props;

        return(
            <div>
                <h1>Courses</h1>
                <input type="submit"
                        value="Add Course"
                        className="btn btn-primary"
                        onClick={this.redirectToAddCourse} />
                <CourseList courses={this.props.courses} />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    //createCourse: PropTypes.func.isRequired
    actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch){
    return {
       // createCourse: course => dispatch(courseActions.createCourse(course))
       actions: bindActionCreators(courseActions,dispatch)
    };
}
function mapStateToProps(state,ownProps){
    console.log(state);
    return {
        courses: state.courses
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(CoursesPage);