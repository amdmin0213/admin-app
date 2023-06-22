<template>
  <div>
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
      liveCourses: [],
      completedCourses: []
    };
  },
  async mounted() {
    const courseData = await moodleService.getCourseData();
    this.courses = courseData;
    
    console.log(this.liveCourses, this.completedCourses);

  },
  methods: {
    openCourse(course) {
      this.$router.push({ name: 'CourseDetails', params: { course } });
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
    }
  },
};
</script>
