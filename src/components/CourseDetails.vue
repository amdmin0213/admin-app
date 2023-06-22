<template>
  <div>
    <img src="https://learn.myllama.co/webservice/pluginfile.php/63/course/overviewfiles/Negotiations%20%20Difficult%20Conversations.jpg?wstoken=99c50aa3c5d4a8e4e1ff2016ba0d6dae" alt="">
  {{course}}
  </div>
</template>
<script>
import moodleService from '../services/moodleService';

export default {
  name: 'CourseDetails',
  data() {
    return {
      course: {}
    };
  },
  async mounted(){
    const id = this.$route.params.id;
    this.course = await moodleService.getCourse([id]);
  }
};
</script>
<style scoped>

</style>
  