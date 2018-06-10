<template>
  <span @mouseout="vv = val" class="stars title amber--text">
    <span v-for="i in max" :key="i" class="star">
      <span @mouseover="vv = (i >= min) ? i : min" @click="val = (i >= min) ? i : min">
        <span v-if="i <= vv">★</span>
        <span v-else>☆</span>
      </span>
      <!-- <span @mouseover="vv = (i >= min) ? i : min" @click="val = (i >= min) ? i : min">{{ i <= vv ? "1" : "2" }}</span> -->
    </span>
  </span>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      validator: val => (val >=0 && val <= 10),
      default: 1
    },
    max: {
      type: Number,
      validator: val => (val >=2 && val <= 10),
      default: 5
    },
    videoId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      vv: 0,
      val: 0
      // vv: 5,
      // val: 5
    }
  },
  beforeMount () {
    this.vv = this.val = this.$store.getters.getVideoRating(this.videoId)
  },
  watch: {
    val: function (newval, oldval) {
      this.$store.commit('setVideoRating', { id: this.videoId, rating: newval })
    }
  }
}
</script>

<style scoped>
.stars {
  display: inline-flex;
  width: 110px;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.stars:hover {
  cursor: pointer;
}
.star {
  height: 20px;
  width: 22px;
  text-align: center;
  transition: font-size .15s, color 0.6s;
}
.star:hover {
  font-size: 1.4em !important;
  color: #fff !important;
}
</style>
