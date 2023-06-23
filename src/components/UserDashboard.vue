<template>
  <div>
    <div class="info-section">
      <div class="info-card" v-if="filterCourses('live').length">
        <p>Live courses</p>
        <h2>{{ filterCourses('live').length }}</h2>
      </div>     
      <div class="info-card" v-if="filterCourses('completed').length">
        <p>Completed courses</p>
        <h2>{{ filterCourses('completed').length }}</h2>
      </div>
      <div class="info-card" v-if="getEnrolledUsers('live')">
        <p>People Attending</p>
        <h2>{{ getEnrolledUsers('live') }}</h2>
      </div>
      <div class="info-card" v-if="getEnrolledUsers('completed')">
        <p>People Completed</p>
        <h2>{{ getEnrolledUsers('completed') }}</h2>
      </div>

    </div>
    <div class="cohorts">
      <div class="heading">
        <h1>Your Cohorts</h1>
      </div>

      <hr>
      
      <div v-if="filterCourses('live').length" class="live-courses">
        <h2>Live courses</h2>
        <div class="search-box">
          <i class="fa fa-search icon" aria-hidden="true"></i>
          <input placeholder="Search" type="text">
          <button>Add</button>
        </div>
        <div class="courses-wrapper">
          <div v-for="(course, index) in filterCourses('live')" :key="course.id">
            <CourseCard 
              :class="{'card-border' : index !== filterCourses('live').length-1}"
              :course="course"
              @click="openCourse(course)"
            />
          </div>
        </div>
      </div>
  
      <div v-if="filterCourses('completed').length" class="completed-courses">
        <h2>Completed courses</h2>
        <!-- <div class="search-box">
          <i class="fa fa-search icon" aria-hidden="true"></i>
          <input placeholder="Search" type="text">
          <button>Add</button>
        </div> -->
        <div class="courses-wrapper">
          <div v-for="(course, index) in filterCourses('completed')" :key="course.id">
            <CourseCard 
              :class="{'card-border' : index !== filterCourses('completed').length-1}"
              :course="course"
              @click="openCourse(course)"
            />
          </div>
        </div>
      </div>
    </div>
    
    
  </div>
</template>

<script>
import moodleService from '../services/moodleService';
import CourseCard from './CourseCard.vue';

export default {
  name: 'UserDashboard',
  components: {
    CourseCard,
  },
  data() {
    return {
      courses: [],
      userid: '', // Assuming you have the user id available to get the enrolled courses
      enrolledUsers: 0
    };
  },
  async mounted() {
    const courseData = await moodleService.getCourseData();
    this.courses = courseData;
    const courseIds = this.courses.map(course => course.id);

    const enrolledUsers = await moodleService.countEnrolledUsers(courseIds);
    this.enrolledUsers = enrolledUsers;
    
    

  },
  methods: {
    openCourse(course) {
      this.$router.push(`/course/${course.id}`, {params: { course }});
    },
    filterCourses(type){
      if(type == 'live') {
        let liveCourses = this.courses.filter(course => {
          if(course.status == 'live') return true;
        })
        return liveCourses;
      } else if (type == 'completed') {
        let completedCourses = this.courses.filter(course => {
          if(course.status == 'completed') return true;
        })
        return completedCourses;
      }
    },
    getEnrolledUsers(type){
      const courses = this.filterCourses(type);
      let sum = 0;
      courses.map(course => {
        sum = sum + Number(course.enrolledusercount);
      });
      return sum;
      
    }
  },
};
</script>
<style scoped>
.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 10px;
}
.info-card {
  width: 280px;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 20px;
  margin: 20px auto;
  background-color: #FFF;
}

.courses-wrapper {
  border: 1px solid grey;
  border-radius: 10px;
  margin: 20px auto;
  background-color: #FFF;
}

.heading  {
  height: 80px;
  padding: 20px;
  border-bottom: 1px solid #d8dadb;
  background-color: #FFF;
}

hr {
  margin: 20px;
  height: 2px;
  border: none;
  background-color: #d8dadb
}

.live-courses, .completed-courses {
  margin: 20px;
}

h2 {
  margin: 16px 0px;
}

.card-border {
  border-bottom: 1px solid grey;
}

.search-box {
  margin: 20px 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.search-box input {
  height: 35px;
  width: 300px;
  margin-right: 10px;
  border-radius: 10px;
  outline: none;
  border: 1px solid grey;
  text-indent: 35px;
  font-size: 16px;
}

.search-box input:focus{
  border: 2px solid #F47431;
}

.search-box i {
  position: relative;
  left: 40px;
  font-size: 16px;
  color: rgb(204, 202, 202);
}
  
.icon {
  padding: 10px;
  min-width: 40px;
}

.search-box button {
  padding: 0px 15px;
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: #F47431;
  color: #FFF;
  font-size: 14px;
  font-weight: 600;
}
</style>
