<template>
    <div>
      <h1>{{ course.fullname }}</h1>
      <p>{{ course.summary }}</p>
      <p>Participants: {{ participants }}</p>
    </div>
  </template>
  
  <script>
  import moodleService from '../services/moodleService';
  
  export default {
    name: 'CourseDetails',
    data() {
      return {
        course: null,
        participants: 0,
      };
    },
    async created() {
      this.course = this.$route.params.course;
      const token = '99c50aa3c5d4a8e4e1ff2016ba0d6dae';
      this.participants = await moodleService.getParticipantsCount(this.course.id, token);
    },
  };
  </script>
  