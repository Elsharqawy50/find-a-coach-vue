import axios from 'axios'

const requestModule = {
  namespaced: true,
  state() {
    return {
      requests: [],
    }
  },
  getters: {
    requests(state, _, _2, rootGetters) {
      return state.requests.filter((request) => request.coachId === rootGetters.userId)
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length > 0
    },
  },
  mutations: {
    addNewRequest(state, payload) {
      state.requests.push(payload)
    },
    setRequests(state, payload) {
      state.requests = payload
    },
  },
  actions: {
    async contactCoach(context, payload) {
      const newRequest = {
        email: payload.email,
        message: payload.message,
      }
      try {
        const response = await axios.post(
          `https://find-a-coach-vue-3006b-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
          newRequest,
        )

        payload.id = response.data.name

        context.commit('addNewRequest', payload)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async loadRequests(context) {
      try {
        const token = context.rootGetters.token

        const response = await axios(
          `https://find-a-coach-vue-3006b-default-rtdb.firebaseio.com/requests/${context.rootGetters.userId}.json?auth=${token}`,
        )

        const requests = []
        for (const key in response.data) {
          const request = {
            id: key,
            coachId: context.rootGetters.userId,
            email: response.data[key].email,
            message: response.data[key].message,
          }
          requests.push(request)
        }

        context.commit('setRequests', requests)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },
}

export default requestModule
