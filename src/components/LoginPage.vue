<template>
  <div>
    <form action="submit">
      <label for="username">Username</label>
      <input v-model="username" type="text">
      <label for="password">password</label>
      <input v-model="password" type="password">
      <button @click.prevent="login">Login</button>
    </form>
    
    
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: "",
      password: "" 
    }
  },
  methods: {
    async login(){

      const response = await fetch("https://learn.myllama.co/login/token.php?" + new URLSearchParams({
        servise: 'test_ws',
        username: this.username, 
        password: this.password, 
        service: 'moodle_mobile_app'
      }), {
        method: 'GET',
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });

      console.log(response);
    }

  }
}
</script>


