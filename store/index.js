import Vuex from 'vuex'

const state = {
  ratings: {},
  region: 'RU'
}

const getters = {
  getVideoRating: state => id => state.ratings[id] || 0,
  getRegion: state => state.region
}

const mutations = {
  setVideoRating: (state, {id, rating}) => state.ratings[id] = rating,
  setRegion: (state, code) => state.region = code
}

const actions = {
}

export default () => {
  return new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  })
}
