<template>
  <div class="navbar">
    <div class="logo">
        <i v-if="$route.path != '/dashboard'" @click="back" class='fas fa-angle-left back-button'></i>
        <img src="../assets/logo.webp" alt="">
        <span>Llama</span>
    </div>
    <div class="profile">
      <button class="profile-button">
        <img :src="user.userpictureurl" alt="">
      </button>
      <div class="popover-content">
        <button @click="logout">Logout</button>
      </div>
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
    logout() {
      this.$router.push('/')
      localStorage.removeItem('token');
      localStorage.removeItem('userid');
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

.profile-button, .profile img {
  border: none;
  outline: none;
  border-radius: 100%;
  height: 35px;
  width: 35px;
  cursor: pointer;
}

.profile {
  cursor: pointer;
}

.back-button {
  font-size: 30px;
  font-weight: 800;
  cursor: pointer;
  margin-right: 10px;
}  

.popover-content button {
  visibility: hidden;
  z-index: -1;
  height: 40px;
  width: 100px;
  position: absolute;
  right: 10px;
  border: none;
  border-radius: 10px;
  background-color: #FFF;
  cursor: pointer;
}

.profile:hover .popover-content button {
  visibility: visible;
  z-index: 10;
}

</style>
  