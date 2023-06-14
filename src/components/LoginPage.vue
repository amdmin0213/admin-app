<template>
  <div>
    <form action="submit">
      <label for="username">Token</label>
      <input v-model="token" type="password">
      <button @click.prevent="login">Display cources</button>
    </form>
    
    
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      token: ""
    }
  },
  methods: {
    async login(){
      const data = {
        wstoken: this.token,
        wsfunction: "core_course_get_courses",
        moodlewsrestformat: 'json'
      }

      const response = await fetch("https://learn.myllama.co/webservice/rest/server.php", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body:  JSON.stringify(data)
      });

      console.log(response);
    }

  }
}
</script>


