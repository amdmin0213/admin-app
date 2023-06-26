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

  async getCourseData() {
    try {
      const response = await axios.post(`https://learn.myllama.co/webservice/rest/server.php?wsfunction=core_enrol_get_users_courses&wstoken=${this.token ? this.token : localStorage.getItem('token')}&userid=${localStorage.getItem('userid')}`);
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
  }
};

export default moodleService;
