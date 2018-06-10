<template>
  <v-layout column justify-center align-center>
    <v-flex xs12>
      <v-toolbar color="info" dark>
        <v-toolbar-title>Самые популярные видео</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom offset-y left>
          <v-btn slot="activator" flat class="info">Регион</v-btn>
          <v-list>
            <v-list-tile v-for="item in regions" :key="item.value">
              <v-btn @click="regionClick(item.value)" flat block small :class="{ 'region-selected-color' : (item.value == getRegion) }">
                {{ item.text }}
              </v-btn>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
      <VideoList :videos="videos"></VideoList>
    </v-flex>
  </v-layout>
</template>

<script>
import { getVideos } from '~/assets/youtuber.js'
import VideoList from '~/components/VideoList'

export default {
  components: {
    VideoList
  },
  data () {
    return {
      regions: [
        { text: 'Россия', value: 'RU' },
        { text: 'Франция', value: 'FR' },
        { text: 'Германия', value: 'DE' },
        { text: 'США', value: 'US' },
        { text: 'Южная Корея', value: 'KR' },
        { text: 'Япония', value: 'JP' }
      ]
    }
  },
  async asyncData (context) {
    let code = context.store.getters.getRegion
    let videos = await getVideos(context.env.youtubeApiKey, code, context.store)
    return { videos }
  },
  methods: {
    async regionClick(code) {
      this.$store.commit('setRegion', code)

      this.$nuxt.$loading.start()
      this.videos = await getVideos(process.env.youtubeApiKey, code, this.$store)
      this.$nuxt.$loading.finish()
    }
  },
  computed: {
    getRegion () { return this.$store.getters.getRegion }
  }
}
</script>

<style scoped>
.region-selected-color {
  color: #009688;
}
</style>
