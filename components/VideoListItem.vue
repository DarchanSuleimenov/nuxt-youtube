<template>
  <v-card>
    <nuxt-link :to="videoLink" class="link-block">
      <v-card-media
        :src="videoImage"
        height="200px"
      >
        <v-flex class="video-title-container" xs12 align-end flexbox>
          <span class="video-title title white--text" v-text="videoTitle"></span>
        </v-flex>
      </v-card-media>
      <v-card-actions class="rating">
        <span class="blue-grey--text text--darken-1 video-number">#{{ videoN }}</span>
        <v-spacer></v-spacer>
        <span class="amber--text text--darken-2">{{ videoRating | toStars }}</span>
      </v-card-actions>
    </nuxt-link>
  </v-card>
</template>

<script>
  export default {
    props: {
      videoN: {
        type: Number,
        default: 0
      },
      videoTitle: {
        type: String,
        // required: true,
        default: 'название не указано...'
      },
      videoImage: {
        type: String,
        // required: true,
        default: 'no-image.png'
      },
      videoLink: {
        type: String,
        default: '/'
      },
      videoRating: {
        type: Number,
        default: 0
      }
    },
    filters: {
      toStars: stars => "★".repeat(stars) + "☆".repeat(5 - stars)
    }
  }
</script>

<style scoped>
.video-title-container {
  display: flex;
  align-items: flex-end;
  padding: 0 !important;
}
.video-title {
  display: inline-block;
  width: 100%;
  padding: 10px;
  background: rgba(50, 50, 50, .35);
  background: rgba(55, 55, 55, .60);
  font-size: 18px;
  font-weight: normal;
  text-shadow: 1px 1px 1px #000, 2px 2px 1px #000;
}
.link-block {
  text-decoration: none;
}
.video-number {
  font-weight: bold;
}
.rating {
  font-size: 18px;
}
</style>
