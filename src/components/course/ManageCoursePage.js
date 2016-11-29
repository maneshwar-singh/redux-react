import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component{
    constructor(props,context){
        super(props,context);

        this.state = {
            course: Object.assign({},this.props.course),
            errors: {},
            loading: false
        };
        this.updateCourseState  = this.updateCourseState.bind(this);
        this.saveCourse  = this.saveCourse.bind(this);
    }
    
    componentWillReceiveProps (nextProps){
       
        if(this.props.course.id != nextProps.course.id){
            this.setState({course: Object.assign({},nextProps.course)});
        }
    }

    updateCourseState(event){
        const field = event.target.name;
        let course  = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course});
    }

    saveCourse(event) {
        event.preventDefault();
        this.setState({loading:true});
        this.props.actions.saveCourse(this.state.course)
        .then(() => this.redirect())
        .catch(error => {
            this.setState({loading:false});
            toastr.error(error);
        });        
        
    }
    
    redirect(){
        this.setState({loading:false});
        toastr.success('Course Saved!');
        this.context.router.push('/courses');
    }

    render(){
        return(
            <div>                
                <CourseForm 
                allAuthors={this.props.authors}
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                course={this.state.course}
                errors={this.state.errors}
                loading={this.state.loading}
                 />
            </div>
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, id){
    // This course returns an array
    const course = courses.filter(course => course.id == id);
    if(course.length>0) return course[0];
    return null;
}
//ownProps are parameters passed on in the page.
function mapStateToProps(state,ownProps){
    const courseId = ownProps.params.id;

    let course = {id: '',watchHref: '', title: '', authorId: '', category: '', length: ''};
    if(courseId && state.courses.length > 0 ){
        course = getCourseById(state.courses, courseId);
    }
    const authorsFormattedForDropdown = state.authors.map(author => {
        return{
            value: author.id,
            text:author.firstName + ' ' + author.lastName
        };
    });    
    return {
        course: course,
        authors: authorsFormattedForDropdown

    };
}

function mapDispatchToProps(dispatch){
return {
    actions: bindActionCreators(courseActions,dispatch)
};
}

export default connect(mapStateToProps,mapDispatchToProps)(ManageCoursePage);

