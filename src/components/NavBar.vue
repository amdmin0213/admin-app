<template>
  <div class="navbar">
    <div class="logo">
        <img src="../assets/logo.webp" alt="">
        <span>Llama</span>
    </div>
    <div class="profile">
        <button @click="userProfile">
            <img src="https://secure.gravatar.com/avatar/fc25b5644b0dcceb293ca0e215cb9a2b?s=35&amp;d=mm" alt="">
        </button>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  data() {
    return {
    };
  },
  methods: {
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
.logo img, .prodile img {
    height: 35px;
    width: 35px;
}

.prodile img {
    border-radius: 100% ;
}

.profile button, .prodile img {
    border: none;
    outline: none;
    border-radius: 100%;
    height: 35px;
    width: 35px;
}
</style>
  