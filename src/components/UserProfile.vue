<template>
  <div>
    <div class="user-info">
        <img :src="user.userpictureurl" alt="">
        <div>
            <p class="overline">{{ user.department }}</p>
            <h3>{{ user.fullname }}</h3>
            <p>{{ user.email }}</p>
        </div>
    </div>

    <button @click="logout">Logout</button> 

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
    await this.getUser();
  }, 
  methods: {
    async getUser(){
      this.user = await moodleService.getUserProfile();
      console.log(this.user);
    },
    logout() {
        this.$router.push('/')
        localStorage.removeItem('token');
        localStorage.removeItem('userid');

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

button {
  margin: 30px;
  border: none;
  outline: none;
  width: 100px;
  height: 30px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 400;
  background-color: #F47431;
  color: #FFF;
}
</style>
  