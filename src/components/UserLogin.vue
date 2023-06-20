<template>
  <div>
    <h1>Login</h1>
    <input v-model="username" placeholder="Username">
    <input v-model="password" placeholder="Password" type="password">
    <button @click="login">Login</button>
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
      const success = await moodleService.login(this.username, this.password);
      if (success) {
        this.$router.push('/dashboard');
      } else {
        // handle failed login
      }
    },
  },
};
</script>
