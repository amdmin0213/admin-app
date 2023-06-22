<template>
  <div>
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
  