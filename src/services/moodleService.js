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
        await this.getUserDetails(username);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async getUserDetails(username) {
    console.log("abc")
    try {
      const resp = await axios.get(`https://learn.myllama.co/webservice/rest/server.php?wstoken=${this.token ? this.token : localStorage.getItem('token')}`, {
        params: {
          'wsfunction': 'core_user_get_users',
          'criteria': [['username', username]],
        }
      })
      console.log(resp);
    } catch(error){
      console.log(error);
    }
  },

  async getCourseData() {
    try {
      const response = await axios.post(`https://learn.myllama.co/webservice/rest/server.php?wsfunction=core_enrol_get_users_courses&wstoken=${this.token ? this.token : localStorage.getItem('token')}&userid=28`, {
        headers: {
          "Content-Type": "application/json",
        }
      });
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
    console.log(courseId)
    try {
      const response = await axios.get(`https://learn.myllama.co/webservice/rest/server.php?wsfunction=core_course_get_courses_by_field&field=id&value=${courseId}&wstoken=${this.token ? this.token : localStorage.getItem('token')}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
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
