<template>
  <v-layout column>
    <v-flex xs12>
      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              v-for="(video, index) in videos"
              :key="video.id"
              v-bind:class="{ 'xs12': index == 0, 'xs12 sm6 md4 xl3': index > 0 }"
              >
              <VideoListItem
                :video-n="index + 1"
                :video-title="video.title"
                :video-image="video.img"
                :video-link="makeUrl(video.id)"
                :video-rating="video.rating"
                >
              </VideoListItem>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import VideoListItem from '~/components/VideoListItem'

export default {
  components: {
    VideoListItem
  },
  props: {
    videos: {
      type: Array,
      required: true
      // default: {}
    }
  },
  methods: {
    makeUrl: video_id => `/video/${video_id}`,
  }
}
</script>
