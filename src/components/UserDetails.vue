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
  </div>
</template>
<script>
import moodleService from '../services/moodleService';

export default {
  name: 'UserDetails',
  data() {
    return {
      user: {},
      token: localStorage.getItem('token'),
      enrolledUsers: []
    };
  },
  async mounted(){
    const id = this.$route.params.id;
    await this.getEnrolledUsers(id);
    this.getUser();
  }, 
  methods: {
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


hr {
  height: 2px;
  border: none;
  background-color: #d8dadb
}
</style>
  