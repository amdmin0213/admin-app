import axios from 'axios';

const moodleService = {

  token: '',

  async login(username, password) {
    try {
      const response = await axios.get(`https://learn.myllama.co/login/token.php?username=${username}&password=${password}&service=moodle_mobile_app`);
      if (response.data.token) {
        this.token = response.data.token;
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async getCourseData() {
    try {
      const response = await axios.post(`https://learn.myllama.co/webservice/rest/server.php?wsfunction=core_enrol_get_users_courses&wstoken=${this.token}&userid=28`, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      const courses = response.data;
      let totalParticipants = 0;

      return {
        totalCourses: courses.length,
        totalParticipants,
      };
    } catch (error) {
      console.error(error);
      return {
        totalCourses: 0,
        totalParticipants: 0,
      };
    }
  },

  async getCourse(courseId) {
    try {
      const response = await axios.get(`https://learn.myllama.co/webservice/rest/server.php?wsfunction=core_course_get_courses_by_field&field=id&value=${courseId}&wstoken=${this.token}`);
      return response.data.courses[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async getCourseParticipants(courseId) {
    try {
      const response = await axios.get(`https://learn.myllama.co/webservice/rest/server.php?wsfunction=core_enrol_get_enrolled_users&courseid=${courseId}&wstoken=${this.token}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

export default moodleService;
