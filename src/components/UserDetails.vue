<template>
  <div>
    <div class="user-info">
        <img :src="user.profileimageurl" alt="">
        <div>
            <p class="overline">{{ user.department }}</p>
            <h3>{{ user.fullname }}</h3>
            <p>{{ user.email }}</p>
        </div>
    </div>

    <hr>

    <div class="contact-info">
      <h3>Contact Info</h3>
      <div class="details">
        <div v-if="user.fullname">
          <p>Full Name</p>
          {{ user.fullname }}
        </div>
        <div v-if="user.city">
          <p>Location</p>
          {{ user.city }}
        </div>
        <div v-if="user.phone1">
          <p>Phone Number</p>
          {{ user.phone1 }}
        </div>
        <div v-if="user.email">
          <p>Email</p>
          {{ user.email }}
        </div>
        <div v-if="user.department">
          <p>Team</p>
          {{ user.department }}
        </div>
        <div v-if="user.birthday">
          <p>Birthday</p>
          {{ user.birthday }}
        </div>
      </div>
    </div>

    <hr>

    <div v-if="filterCourses('live').length" class="live-courses">
      <h2>Active courses</h2>
      {{filterCourses('completed')}}
      <div class="courses-wrapper">
        <div v-for="(course, index) in filterCourses('live')" :key="course.id">
          <CourseCard 
            :class="{'card-border' : index !== filterCourses('live').length-1}"
            :course="course"
          />
        </div>
      </div>
    </div>

    <div v-if="filterCourses('completed').length" class="completed-courses">
      <h2>Completed courses</h2>
      <div class="courses-wrapper">
        <div v-for="(course, index) in filterCourses('completed')" :key="course.id">
          <CourseCard 
            :class="{'card-border' : index !== filterCourses('completed').length-1}"
            :course="course"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moodleService from '../services/moodleService';
import CourseCard from './CourseCard.vue';

export default {
  name: 'UserDetails',
  components: {
    CourseCard
  },
  data() {
    return {
      user: {},
      token: localStorage.getItem('token'),
      enrolledUsers: [],
      enrolledCourses: []
    };
  },
  async created(){
    const id = this.$route.params.id;
    await this.getEnrolledUsers(id);
    await this.getEnrolledCourses();
    this.getUser();
  }, 
  methods: {
    async getEnrolledCourses(){
      this.enrolledCourses = await moodleService.getCourseData(this.$route.params.userid);
    },
    filterCourses(type){
      if(type == 'live') {
        let liveCourses = this.enrolledCourses.filter(course => {
          if(course.status == 'live') return true;
        })
        return liveCourses;
      } else if (type == 'completed') {
        let completedCourses = this.enrolledCourses.filter(course => {
          if(course.status == 'completed') return true;
        })
        return completedCourses;
      }
    },
    async getUser(){
      this.user = this.enrolledUsers.find(user => { 
        return user.id == this.$route.params.userid
      });
    },
    async getEnrolledUsers(id){
      this.enrolledUsers = await moodleService.countEnrolledUsers(id);
    }  
  }  
};
</script>
<style scoped>
.user-info {
  display: flex;
  padding: 40px 30px;
  background-color: #FFF;
  align-items: center;
  line-height: 30px;
}

.user-info img {
    height: 100px;
    width: 100px;
    border-radius: 10px;
    margin-right: 20px;
}

.details {
  margin: 30px;
  display: flex;
  align-items: center;
  line-height: 30px;
}

.contact-info {
  background-color: #FFF;
  margin: 20px 30px;
  border: 1px solid #d8dadb;
  border-radius: 10px;
  padding: 20px;
}

.details {
    display: flex;
    justify-content: space-between;
}

.details p{
    color: #939596;
}

.details div {
    width: 40%;
}

.overline {
  font-size: 14px;
  font-weight: 600;
  color: #F47431;
}

.courses-wrapper {
  border: 1px solid grey;
  border-radius: 10px;
  margin: 20px auto;
  background-color: #FFF;
}

.live-courses, .completed-courses {
  margin: 20px;
  pointer-events: none;
}

h2 {
  margin: 16px 0px;
}

.card-border {
  border-bottom: 1px solid grey;
}

hr {
  height: 2px;
  border: none;
  background-color: #d8dadb
}
</style>
  