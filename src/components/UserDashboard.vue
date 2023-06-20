<template>
  <div>
    <h1>Dashboard</h1>
    <div>
      <CourseCard
        v-for="course in courses"
        :key="course.id"
        :course="course"
        @click="openCourse(course)"
      />
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
    };
  },
  async created() {
    const courseData = await moodleService.getCourseData();
    this.courses = courseData.totalCourses;
  },
  methods: {
    openCourse(course) {
      this.$router.push({ name: 'CourseDetails', params: { course } });
    },
  },
};
</script>
