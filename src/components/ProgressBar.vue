<template>
  <div class="flex-none justify-center">
    <div class="svg-rotate flex justify-center">
      <div class="absolute pt-28 text-7xl text-orange-400">{{ time }}</div>
      <svg :width="width" :height="height" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          :r="radiusCircle"
          fill="none"
          :stroke="defaultOptions.progress.backgroundColor"
          :stroke-width="defaultOptions.layout.strokeWidth"
        />
        <circle
          cx="60"
          cy="60"
          :r="radiusCircle"
          fill="none"
          :stroke="defaultOptions.progress.color"
          :stroke-width="defaultOptions.layout.strokeWidth"
          :stroke-dasharray="strokeCircle"
          :stroke-dashoffset="strokeCircleOffset"
        />
      </svg>
    </div>
  </div>
</template>

<script>
const s = x => x + "s";
const px = v => v + "px";
export default {
  created() {
    console.log("Created progress bar");

    this.defaultOptions = {
      progress: {
        color: "#68D391",
        backgroundColor: "#E2E8F0"
      },
      layout: {
        height: 350,
        width: 350,
        strokeWidth: 3,
        type: "circle"
      }
    };
  },
  mounted() {
    console.log("Mounted progress bar");
    console.log({
      min: this.min,
      sec: this.sec
    });
    this.updateValue(this.value);
  },
  props: ['value', 'sec', 'min'],
  name: "ProgressBar",
  data() {
    return {
      defaultOptions: Object,
      rectHeight: 0,
      rectY: 90,
      topCy: -20,
      radiusCircle: 54,
      strokeCircle: 0,
      strokeCircleOffset: 0
    };
  },
  methods: {
    updateValue(val) {
      let invertedVal = 100 - val;
      if (this.cylinder) {
        this.rectHeight = 80 - invertedVal * 0.8;
        this.rectY = invertedVal * 0.8 + 20;
        this.topCy = -invertedVal * -0.8 + 20;
        this.cylText = 100 - invertedVal + "%";
      } else if (this.circle) {
        this.strokeCircle = 2 * Math.PI * this.radiusCircle;
        this.strokeCircleOffset = this.strokeCircle * ((100 - val) / 100);
      }
    },
    LightenColor: function(color, level) {
      var usePound = false;
      if (color[0] == "#") {
        color = color.slice(1);
        usePound = true;
      }

      var num = parseInt(color, 16);
      var r = (num >> 16) + level;
      if (r > 255) r = 255;
      else if (r < 0) r = 0;

      var b = ((num >> 8) & 0x00ff) + level;

      if (b > 255) b = 255;
      else if (b < 0) b = 0;

      var g = (num & 0x0000ff) + level;

      if (g > 255) g = 255;
      else if (g < 0) g = 0;

      return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }
  },
  computed: {
    time() {
      return (
        (this.min < 10 ? "0" + this.min : this.min)
         + ":" +
         (this.sec < 10 ? "0" + this.sec : this.sec)
      );
    },
    circle() {
      return this.defaultOptions.layout.type === "circle";
    },
    width() {
      return this.defaultOptions.layout.width;
    },
    height() {
      return this.defaultOptions.layout.height;
    }
  },
  watch: {
    value: function(val) {
      this.updateValue(val);
    },
    min: function(val) {
      this.min = val;
    },
    sec: function(val) {
      this.sec = val;
    }
  }
};
</script>


<style lang="scss" scoped>
.svg-rotate {
  svg {
    transform: rotate(-90deg);
  }
}
</style>