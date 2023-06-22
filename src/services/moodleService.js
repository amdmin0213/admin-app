import axios from 'axios';
import convert from 'xml-js'


const moodleService = {

  token: '',

  async login(username, password) {
    try {
      const response = await axios.get(`https://learn.myllama.co/login/token.php?username=${username}&password=${password}&service=moodle_mobile_app`);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        this.token = await response.data.token;
        // await this.getUserDetails(username);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async getUserDetails(username) {
    // console.log("abc")
    try {
      const resp = await axios.get(`https://learn.myllama.co/webservice/rest/server.php?wstoken=${this.token ? this.token : localStorage.getItem('token')}`, {
        params: {
          'wsfunction': 'core_user_get_users',
          'criteria': [['username', username]],
        }
      })
      return resp;
      // console.log(resp);
    } catch(error){
      console.log(error);
    }
  },

  async getCourseData() {
    try {
      const response = await axios.post(`https://learn.myllama.co/webservice/rest/server.php?wsfunction=core_enrol_get_users_courses&wstoken=${this.token ? this.token : localStorage.getItem('token')}&userid=67`);
      let courses = JSON.parse(convert.xml2json(response.data));
      
      courses = courses.elements[0].elements[0].elements;
      const currentDate = new Date();
      const timeStamp = currentDate.getTime();
      courses = courses.reduce((courses, course) => {
        let courseObject = {};
        course.elements.map(field => {
          courseObject[field.attributes.name] = field.elements[0]?.elements ?  field.elements[0]?.elements[0].text : "";
        })
        if(courseObject["enddate"] > timeStamp) {
          courseObject.status = 'live';
        } else {
          courseObject.status = 'completed';
        }
        courses.push(courseObject);
              
        return courses
      }, []);
       
      return courses;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  async getCourse(courseId) {
    try {
      let response = await axios.get(`https://learn.myllama.co/webservice/rest/server.php?wsfunction=core_course_get_courses_by_field&field=id&value=${courseId}&wstoken=${this.token ? this.token : localStorage.getItem('token')}`);
      response = JSON.parse(convert.xml2json(response.data)).elements[0].elements[0].elements.filter(element => element.attributes.name == 'courses')[0].elements[0].elements[0].elements;
      response = response.reduce((course, field) => {
        console.log(field)
        course[field.attributes.name] = field.elements[0].elements ? field.elements[0]?.elements[0].text : '';
        return course;
      }, {})
      console.log(response)
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async countEnrolledUsers(courseId){
    console.log(courseId)
    try {
      let response = await axios.get('https://learn.myllama.co/webservice/rest/server.php', {
        params: {
          'wstoken': this.token ? this.wstoken : localStorage.getItem('token'),
          'wsfunction': 'core_enrol_get_enrolled_users',
          'courseid': courseId
        }
      })
      response = JSON.parse(convert.xml2json(response.data));
      response = response.elements[0].elements[0].elements;
      console.log(response);
      let users = response.map(user => {
        console.log(user)
        return user.elements.reduce((userObject, field) => {
          if(field.attributes.name === 'enrolledcourses'){
            let enrolledCourses = field.elements[0].elements.map(course => {
              return course.elements.reduce((courseObject, field) => {
                courseObject[field.attributes.name] = field.elements[0].elements ?  field.elements[0]?.elements[0].text : "";
                return courseObject;
              }, {});
              
            });
            userObject[field.attributes.name] = enrolledCourses;
          }
          else userObject[field.attributes.name] = field.elements[0].elements ?  field.elements[0]?.elements[0].text : "";
          return userObject;
        }, {});
      })
      return users;
    } catch(error){
      console.error(error);
    }
  },

  async getCourseParticipants(courseId) {
    try {
      const response = await axios.get(`https://learn.myllama.co/webservice/rest/server.php?wsfunction=core_enrol_get_enrolled_users&courseid=${courseId}&wstoken=${this.token ? this.token : localStorage.getItem('token')}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

export default moodleService;
