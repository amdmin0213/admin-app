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
        await this.getUserProfile();
        await this.get_course_grades();
        await this.get_all_course();
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async getUserProfile() {
    try {
      let resp = await axios.get(`https://learn.myllama.co/webservice/rest/server.php?wstoken=${this.token ? this.token : localStorage.getItem('token')}`, {
        params: {
          'wsfunction': 'core_webservice_get_site_info',
          'moodlewsrestformat': 'json',
        }
      })
      localStorage.setItem('userid', resp.data.userid);

      return resp.data;
    } catch(error){
      console.error(error);
    }
  },

  async getCourseData(userid) {
    try {
      const response = await axios.post(`https://learn.myllama.co/webservice/rest/server.php?wsfunction=core_enrol_get_users_courses&wstoken=${this.token ? this.token : localStorage.getItem('token')}&userid=${userid ? userid : localStorage.getItem('userid')}`);
      let courses = JSON.parse(convert.xml2json(response.data));
      
      courses = courses.elements[0].elements[0].elements;
      const currentDate = new Date();
      const timeStamp = currentDate.getTime();
      courses = courses.reduce((courses, course) => {
        let courseObject = {};
        course.elements.map(field => {
          if(field.attributes.name === "overviewfiles" && field.elements[0].elements){
            courseObject[field.attributes.name] = field.elements[0].elements[0].elements.reduce((overviewfilesObject, overviewField) => {
              overviewfilesObject[overviewField.attributes.name] = overviewField.elements[0].elements ? overviewField.elements[0].elements[0].text : '';
              return overviewfilesObject;
            }, {})
          }
          else courseObject[field.attributes.name] = field.elements[0]?.elements ?  field.elements[0]?.elements[0].text : "";
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
        course[field.attributes.name] = field.elements[0].elements ? field.elements[0]?.elements[0].text : '';
        return course;
      }, {})
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async countEnrolledUsers(courseId){
    try {
      let response = await axios.get('https://learn.myllama.co/webservice/rest/server.php', {
        params: {
          'wstoken': localStorage.getItem('token'),
          'wsfunction': 'core_enrol_get_enrolled_users',
          'moodlewsrestformat': 'json',
          'courseid': courseId,
        }
      })
      return response.data;
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

  async getActivitiesCompletionStatus(courseId, userId) {
    try {
      const response = await axios.get('https://learn.myllama.co/webservice/rest/server.php', {
        params: {
          'wstoken': localStorage.getItem('token'),
          'wsfunction': 'core_completion_get_activities_completion_status',
          'moodlewsrestformat': 'json',
          'courseid': courseId,
          'userid': userId
        }
      })
      const statuses = response.data.statuses.reduce((statuses, status) => {
        statuses[status.cmid] = { status: status.state, modname: status.modname };
        return statuses;
      }, {});
      return statuses;
    } catch (error) {
      console.error(error);
    }
  },

  // Lists the courses in which a specific user is enrolled.
async courseEnrolledBySpecificUser() {
  try {
    const params = {
      'wsfunction': 'core_enrol_get_users_courses',
      'userid': 68,
      'moodlewsrestformat': 'json',
    };
      const response = await axios.get(`https://learn.myllama.co/webservice/rest/server.php?&wstoken=${this.token ? this.token : localStorage.getItem('token')}`,{
      params: params,
    });
      const userList = response.data.users;
      console.log(response);
      return userList;
    } 
  catch (error) {
      console.error('Error while fetching user list:', error);
    }
 },

 // Lists all users in a course and their completion status for each activity.   
 async getCourseCompletionStatus() {
  try {
      const params = {
        'wsfunction': 'core_completion_get_course_completion_status',
        'moodlewsrestformat': 'json',
        'courseid': 13, 
        'userid': 2,    
      };
        const response = await axios.get(`https://learn.myllama.co/webservice/rest/server.php?&wstoken=${this.token ? this.token : localStorage.getItem('token')}`,{
        params: params,
      });
        const status = response.data;
        console.log(response);
        return status;
      } 
      catch (error) {
        console.error(error);
  }
},

// get all the courses
async get_all_course() {
  try {
    const params = {
      'wsfunction': 'core_course_get_courses',
      'moodlewsrestformat': 'json',
    };
      const response = await axios.get(`https://learn.myllama.co/webservice/rest/server.php?&wstoken=${this.token ? this.token : localStorage.getItem('token')}`, {
      params: params,
    });
      const courses = response.data;
      console.log(courses)
      const courseIds = courses.map(course => course.id); 
      console.log(courseIds)
      return courseIds;
    } 
  catch (error) {
      console.error(error);
      return []; 
  }
},

// Get the given user courses final grades
async get_course_grades() {
  const courseIds = await this.get_all_course();
  try {
    const params = {
      'wsfunction': 'mod_quiz_get_quizzes_by_courses',
      'moodlewsrestformat': 'json',
      'courseids': courseIds, 
    };
      const response = await axios.get(`https://learn.myllama.co/webservice/rest/server.php?&wstoken=${this.token ? this.token : localStorage.getItem('token')}`,{
      params: params,
    });
      const progress = response.data;
      console.log(response);
      return progress;
    } 
 catch (error) {
      console.error(error);
  }
}
};

export default moodleService;
