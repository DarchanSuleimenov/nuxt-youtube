import axios from 'axios'

function getVideoList(key, region = 'RU') {
  return axios.get('https://www.googleapis.com/youtube/v3/videos?part=id,snippet&chart=mostPopular&maxResults=30&key=' + key + '&regionCode=' + region)
}

async function getVideos(apikey, region, store) {
  try {
    let { data } = await getVideoList(apikey, region)

    let videos = []
    data.items.map(video => {
      let item = {}
      item.id = video.id
      item.title = video.snippet.title

      item.img = (video.snippet.thumbnails.standard || video.snippet.thumbnails.medium || video.snippet.thumbnails.high || video.snippet.thumbnails.default || video.snippet.thumbnails.low).url

      item.rating = store.getters.getVideoRating(item.id)

      videos.push(item)

    })

    return videos

  } catch (err) {
    console.error(err)
    return []
  }
}

function getVideo(key, id) {
  return axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,topicDetails&key=' + key + '&id=' + id)
}

export { getVideos, getVideo }
