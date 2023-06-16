<template>
  <div>
    <form action="submit">
      <label for="username">token</label>
      <input v-model="token" type="text">
      <!-- <label for="username">username</label>
      <input v-model="username" type="text">
      <label for="password">password</label>
      <input v-model="password" type="text"> -->
      <button @click.prevent="login">Login</button>
    </form>
    
  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'LoginPage',
  data() {
    return {
      token: "",
      username: "",
      password: ""
    }
  },
  methods: {
    async login(){

      // const response = await fetch('https://learn.myllama.co/login/token.php?service=test_ws&username=test_user&password=Test%40user1&service=moodle_mobile_app', {
      //   method: 'GET',
      //   headers: {
      //     "Content-Type": "application/json",
      //   }
      // });
      // console.log(response);
      // const data = {
      //   wstoken: this.token,
      //   wsfunction: 'core_course_get_courses',
      //   moodlewsrestformat: 'json',
      // }

      await axios.post("https://learn.myllama.co/webservice/rest/server.php", {
          'userid': '28',
          'wstoken': '9e36393ba459f690ae66d1b27304019a',
          'wsfunction': 'core_enrol_get_users_courses',
          'moodlewsrestformat': 'json'
      }, {
        params: {
          
        },
        headers: {
          "Content-Type": "application/json",
        }
      }).then((resp) => {
        console.log(resp);
      }).catch((error) => console.log(error));


      // await axios.post("https://learn.myllama.co/webservice/rest/server.php", {
      //   wstoken: this.token,
      //   wsfunction: "core_webservice_get_site_info",
      //   moodlewsrestformat: 'json'
      // }, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   }
      // }).then((resp) => {
      //   console.log(resp);
      // }).catch((error) => console.log(error));

      // const response = await fetch("https://localhost:8080/webservice/rest/server.php", {
      //   method: 'POST',
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data)
      // });
      // console.log(response);

    }
  }
}
</script>


