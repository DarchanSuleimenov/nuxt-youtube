<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-card-media
          class="video-image white--text"
          :src="video.img"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="video-title display-1">{{ video.title }}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div class="video-info">

            <div class="video-details d-flex justify-space-between">
              <v-tooltip bottom>
                <span slot="activator" class="grey--text"><v-icon>date_range</v-icon>&nbsp;&nbsp;{{ video.date | dateFormat }}</span>
                <span>дата загрузки</span>
              </v-tooltip>
              <v-tooltip bottom>
                <span slot="activator" class="grey--text"><v-icon>update</v-icon>&nbsp;&nbsp;{{ video.duration | durationFormat }}</span>
                <span>длительность</span>
              </v-tooltip>
              <v-tooltip bottom>
                <span slot="activator" class="grey--text"><v-icon>visibility</v-icon>&nbsp;&nbsp;{{ video.views | integerFormat }}</span>
                <span>просмотров</span>
              </v-tooltip>
              <v-tooltip bottom>
                <span slot="activator" class="grey--text"><v-icon>mood</v-icon>&nbsp;&nbsp;{{ video.likes | integerFormat }}</span>
                <span>лайков</span>
              </v-tooltip>
              <v-tooltip bottom>
                <span slot="activator" class="grey--text"><v-icon>mood_bad</v-icon>&nbsp;&nbsp;{{ video.dislikes | integerFormat }}</span>
                <span>дизлайков</span>
              </v-tooltip>
              <v-tooltip bottom>
                <span slot="activator" class="grey--text"><v-icon>comment</v-icon>&nbsp;&nbsp;{{ video.comments | integerFormat }}</span>
                <span>комментариев</span>
              </v-tooltip>
            </div>
            <span>Рейтинг:
              <Rating
                :min="1"
                :max="5"
                :video-id="video.id"
              ></Rating>
            </span>
            <br><br>
            <span>Канал: <a :href="makeChannelUrl(video.channel.id)" target="_blank">{{ video.channel.title }}</a></span><br><br>
            <v-layout>
              <v-flex xs10>
                <v-select
                  :items="video.category"
                  item-text="name"
                  item-value="url"
                  v-model="vCategory"
                  label="Категории"
                  autocomplete>
                </v-select>
              </v-flex>
              <v-flex xs2>
                <v-btn flat :href="vCategory" target="_blank">Подробнее</v-btn>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex>
                <v-select
                  :items="video.tags"
                  v-model="vTag"
                  label="Теги"
                  autocomplete>
                </v-select>
              </v-flex>
            </v-layout>

            <v-expansion-panel class="description">
              <v-expansion-panel-content>
                <div slot="header">Описание</div>
                <v-card>
                  <v-card-text>
                    {{ video.desc }}
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>

          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="grey" to="/" nuxt><v-icon>arrow_back_ios</v-icon>&nbsp;Назад</v-btn>
          <v-dialog v-model="videoShow" persistent max-width="70%">
            <v-btn slot="activator" flat color="info"><v-icon>slideshow</v-icon>&nbsp;Просмотреть видео</v-btn>
            <v-card>
              <v-card-title class="subheading">{{ video.title }}</v-card-title>
              <v-card-media>
                <iframe :src="makeVideoUrl(video.id, true)" class="player-frame">
                </iframe>
              </v-card-media>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="info" @click.native="videoShow = false">Закрыть</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-spacer></v-spacer>
          <v-btn flat color="grey" :href="makeVideoUrl(video.id)" target="_blank"><v-icon>open_in_new</v-icon>&nbsp;Открыть в ютубе</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { getVideo } from '~/assets/youtuber.js'
import Rating from '@/components/Rating'

export default {
  components: {
    Rating
  },
  data () {
    return {
      vCategory: '',
      vTag: '',
      videoShow: false
    }
  },
  async asyncData (context) {
    try {
      let id = context.params.id

      let { data } = await getVideo(context.env.youtubeApiKey, id)

      let video = data.items[0]

      let cats = []
      if (video.topicDetails.topicCategories) {
        cats = video.topicDetails.topicCategories.map(
            el => new Object({
              name: el.slice(el.lastIndexOf('/') + 1).replace('_', ' '),
              url: el
            })
          )
      }

      let tags = video.snippet.tags || []

      return {
        video: {
          id: video.id,
          title: video.snippet.title,
          channel: { title: video.snippet.channelTitle, id: video.snippet.channelId },
          date: video.snippet.publishedAt,
          desc: video.snippet.description,

          img: (video.snippet.thumbnails.standard || video.snippet.thumbnails.medium || video.snippet.thumbnails.high || video.snippet.thumbnails.default || video.snippet.thumbnails.low).url,

          tags: tags,
          duration: video.contentDetails.duration,
          views: video.statistics.viewCount,
          likes: video.statistics.likeCount,
          dislikes: video.statistics.dislikeCount,
          comments: video.statistics.commentCount,
          category: cats
        },
        vCategory: cats[0] ? cats[0].url : '',
        vTag: tags[0] || ''
      }

    } catch (err) {
      console.error(err)
      return { video: {} }
    }
  },
  methods: {
    makeChannelUrl(channel_id) {
      return `https://www.youtube.com/channel/${channel_id}`
    },
    makeVideoUrl(video_id, embed = false) {
      return embed ? `https://www.youtube.com/embed/${video_id}` : `https://www.youtube.com/watch?v=${video_id}`
    }
  },
  filters: {
    dateFormat(dstr) {
      let dt = new Date(dstr),
          y = dt.getFullYear(),
          mo = dt.getMonth() < 9 ? '0' + (dt.getMonth() + 1) : (dt.getMonth() + 1),
          d = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate(),
          h = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours(),
          mi = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes()

      return `${y}-${mo}-${d} ${h}:${mi}`
    },
    durationFormat(duration) {
      if (!duration) return ''

      let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      match = match.slice(1).map( x => x != null ? x.replace(/\D/, '') : null )

      let h = (parseInt(match[0]) || 0),
          m = (parseInt(match[1]) || 0),
          s = (parseInt(match[2]) || 0)

      if (h < 10) { h = '0' + h }
      if (m < 10) { m = '0' + m }
      if (s < 10) { s = '0' + s }

      return `${h}:${m}:${s}`
    },
    integerFormat(intStr) {
      if (!intStr) return ''

      const div = ' '
      intStr = intStr.trim()
      return intStr.length < 4 ? intStr : intStr.trim().replace(/\d{3}(?=(\d{3})*$)/g, s => div + s)
    }
  }
}
</script>

<style scoped>
.video-image {
  height: 350px !important;
}
.video-title {
  text-shadow: 1px 1px 1px #000, 2px 2px 1px #000;
}
.video-info {
  width: 100%;
}
.video-details {
  margin-bottom: 20px;
  padding: 0 10px;
  background: #fafafa;
  text-align: center;
}
.description {
  border: 1px solid #eaeaea;
  box-shadow: none;
  white-space: pre-wrap;
}
.player-frame {
  display: block;
  margin: 0 auto;
  width: 90%;
  height: 400px;
}
</style>

