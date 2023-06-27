<template>
  <div class="wrapper">
    <div>
      <img class="login-img" src="../assets/logo.webp">
    </div>
    <div class="form">
      <h1>Welcome!</h1>
      <p>Please enter your username and password</p>
      <input v-model="username" placeholder="Enter your username" type="text">
      <input v-model="password" placeholder="Enter your password" type="password">
    </div>
    <div class="buttons">
      <button @click="login" :disabled="!username && !password" class="sign-in" type="submit">Sign in</button>
      <!-- <hr>
      TODO: need to implement sign in with google.
      <button class="g-sign-in" type="submit">
        <img class="button-icon" src="../assets/googleIcon.jpg">
        Continue with google
      </button> -->
    </div>
  </div>
</template>

<script>
import moodleService from '../services/moodleService';

export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const resp = await moodleService.login(this.username, this.password);
      if (resp) {
        this.$router.push('/dashboard');
      } else {
        console.error(resp);
      }
    },
  },
};
</script>
<style scoped>
.wrapper {
  max-width: 400px;
  background-color: white;
  padding: 40px;
  margin: 70px auto;
  border-radius: 36px;
}

.login-img {
  height: 50px;
  width: 50px;
  display: block;
  margin: auto;
  margin-bottom: 20px;
}

.form input {
  background-color: #F4F5F6;
  padding: 8px 12px;
}

.form p {
  font-size: 0.85rem;
}

.sign-in, .g-sign-in, input {
  height: 40px;
  width: 85%;
  display: block;
  margin: 10px auto;
  border: none;
  outline: none;
  border-radius: 8px;
  font-size: 16px;
}

.button-icon {
  height: 25px;
  width: 25px;
  
}

.sign-in {
  background-color: #F47431; 
  color: #FFF;
}

.g-sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sign-in:disabled {
  pointer-events: none;
  opacity: 0.4;
}

hr {
  border: none;
  height: 2px;
  margin: 15px;
  background-color: #F4F5F6;
}


.form h1, .form p {
  margin-bottom: 24px;
  text-align: center;
}

.form p {
  color: #5D646F;
}

</style>
