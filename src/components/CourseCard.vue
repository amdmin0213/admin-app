<template>
    <div class="card" @click="$emit('click')">
      <div class="card-body">
        <h5 class="card-title">{{ course.fullname }}</h5>
        <p class="card-text">{{ course.summary }}</p>
        <p class="card-text">{{ courseProgress }}% complete</p>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    name: 'CourseCard',
    props: {
      course: {
        type: Object,
        required: true,
      },
    },
    computed: {
      courseProgress() {
        const startDate = new Date(this.course.startdate * 1000); // convert UNIX timestamp to JS timestamp
        const endDate = new Date(this.course.enddate * 1000);
        const now = new Date();
        if (now < startDate) {
          return 0;
        } else if (now > endDate) {
          return 100;
        } else {
          const totalDuration = endDate - startDate;
          const elapsedDuration = now - startDate;
          return Math.floor((elapsedDuration / totalDuration) * 100);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    /* Add your card styles here */
  }
  </style>
  