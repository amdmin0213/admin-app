<template>
    <div class="card" @click="$emit('click')">
      <div class="card-img">
        <img :src="course.overviewfiles ? course.overviewfiles.fileurl+`?token=${token}`: ''" alt="" @error="setDeafaultImage">
      </div>
      <div class="card-body">
        <p class="overline">{{ getStartdate(course.startdate) }}</p>
        <h4 class="card-title">{{ course.fullname }}</h4>
        <p class="card-text">{{ course.shortname }}</p>
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
    data(){
      return {
        token: localStorage.getItem('token')
      }
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
    methods: {
      setDeafaultImage(event) {
        event.target.src = require('@/assets/defaultImage.jpg')
      },
      getStartdate(startdate){
        const date = new Date(startdate * 1000);
        var months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    padding: 20px;
    display: flex;
    align-items: center;
  }

  .card-body {
    margin: 0px 15px;
  }

  .overline {
    font-size: 12px;
    font-weight: 600;
    color: #F47431;
  }

  .card-text {
    font-size: 14px;
    color: grey;
  }

  .card-img img {
    height: 80px;
    width: 80px;
    border-radius: 10px;
  }
  
  </style>
  