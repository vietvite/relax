<template>
  <div>
    <!-- Counter -->
    <progress-bar
      :workTime="this.workTime"
      :shortRest="this.shortRest"
      :longRest="this.longRest"
    ></progress-bar>
  </div>
</template>

<script>
import ProgressBar from "@/components/ProgressBar";
export default {
  name: "home",
  components: {
    ProgressBar
  },
  data() {
    return {
      isActive: false,

      workTime: 25,
      shortRest: 1,
      longRest: 15
    };
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
</style>
