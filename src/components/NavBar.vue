<template>
  <div class="navbar">
    <div class="logo">
        <span @click="back" class="back-button">&#8592;</span>
        <img src="../assets/logo.webp" alt="">
        <span>Llama</span>
    </div>
    <div class="profile">
        <button @click="userProfile">
          <img :src="user.userpictureurl" alt="">
        </button>
    </div>
    
  </div>
</template>
<script>
import moodleService from '../services/moodleService';
export default {
  name: 'NavBar',
  data() {
    return {
      user: {}
    };
  },
  async mounted(){
    this.user = await moodleService.getUserProfile();
  },
  methods: {
    back() {
      this.$router.back();
    },
    userProfile() {
      this.$router.push('/user_profile');
    }
  }
};
</script>
<style scoped>
.navbar {
    background-color: #F47431;
    color: #FFF;
    display: flex;
    justify-content: space-between;
    padding: 10px;
}
.logo  {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;

}
.logo img {
  height: 35px;
  width: 35px;
}

.profile button, .profile img {
  border: none;
  outline: none;
  border-radius: 100%;
  height: 35px;
  width: 35px;
}

.back-button {
  font-size: 35px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
  