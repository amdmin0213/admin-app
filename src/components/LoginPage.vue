<template>
  <div>
    <form action="submit">
      <label for="username">Token</label>
      <input v-model="token" type="text">
      <button @click.prevent="login">Display cources</button>
    </form>
    
    
  </div>
</template>

<script>
// import axios from 'axios';
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

      // await axios.post("http://localhost:8080/webservice/rest/server.php", {
      //   wstoken: this.token,
      //   wsfunction: "core_course_get_courses",
      //   moodlewsrestformat: 'json'
      // }, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   }
      // }).then((resp) => {
      //   console.log(resp);
      // }).catch((error) => console.log(error));

      const response = await fetch("http://localhost:8080/webservice/rest/server.php", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      console.log(response);

    }

  }
}
</script>


