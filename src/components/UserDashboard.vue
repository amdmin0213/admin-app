<template>
  <div>
    <div class="info-section">
      <div class="info-card">
        <p>Live courses</p>
        <h2>{{ filterCourses('live').length }}</h2>
      </div>     
      <div class="info-card">
        <p>Completed courses</p>
        <h2>{{ filterCourses('completed').length }}</h2>
      </div>
      <div class="info-card">
        <p>People Attending</p>
        <h2>{{ getEnrolledUsers('live') }}</h2>
      </div>
      <div class="info-card">
        <p>People Completed</p>
        <h2>{{ getEnrolledUsers('completed') }}</h2>
      </div>

    </div>
    <h1>Your Cohorts</h1>
    <div v-if="filterCourses('live').length" class="live-courses">
      <h2>Live courses</h2>
      <div v-for="course in filterCourses('live')" :key="course.id">
        <CourseCard 
          :course="course"
          @click="openCourse(course)"
        />
      </div>
    </div>

    <div v-if="filterCourses('completed').length" class="completed-courses">
      <h2>Completed courses</h2>
      <div v-for="course in filterCourses('completed')" :key="course.id">
        <CourseCard 
          :course="course"
          @click="openCourse(course)"
        />
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
    async getEnrolledUsers(type){
      let courseIds = this.filterCourses(type).map(course => course.id);
      let enrolledUsers;
      if(courseIds.length){
         enrolledUsers = await Promise.all(courseIds.map(async (id) => {
          return moodleService.countEnrolledUsers(id);
        })).then(values => {
          const sum = values.reduce((sum, value) => {
            return sum + value.length;
          }, 0);
          return sum;
        })
        console.log(enrolledUsers, "enrolledUsers")
        return enrolledUsers;
      }
      return 0;
    }
  },
};
</script>
<style scoped>
.info-section {
  display: flex;
  flex-wrap: wrap;
}
.info-card {
  max-width: 360px;
}
</style>
