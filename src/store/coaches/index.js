import axios from 'axios'

const coachModule = {
  namespaced: true,
  state() {
    return {
      coaches: [],
    }
  },
  getters: {
    filteredCoaches(state) {
      return state.coaches
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0
    },
  },
  mutations: {
    addNewCoach(state, payload) {
      state.coaches.push(payload)
    },
    setCoaches(state, payload) {
      state.coaches = payload
    },
  },
  actions: {
    async registerCoach(context, payload) {
      const { id, ...data } = payload
      const token = context.rootGetters.token
      try {
        await axios.put(
          `https://find-a-coach-vue-3006b-default-rtdb.firebaseio.com/coaches/${id}.json?auth=${token}`,
          data,
        )

        context.commit('addNewCoach', payload)
      } catch (error) {
        console.log(error)
      }
    },
    async loadCoaches(context) {
      try {
        const response = await axios.get(
          'https://find-a-coach-vue-3006b-default-rtdb.firebaseio.com/coaches.json',
        )
        const coaches = []
        for (const key in response.data) {
          const coach = {
            id: key,
            ...response.data[key],
          }
          coaches.push(coach)
        }
        context.commit('setCoaches', coaches)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },
}

export default coachModule
