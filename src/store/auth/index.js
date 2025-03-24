import axios from 'axios'
import VueCookies from 'vue-cookies' // Import VueCookies

const authModule = {
  state() {
    return {
      userId: '',
      token: null,
      isAuthenticated: false,
    }
  },
  getters: {
    userId(state) {
      return state.userId
    },
    isCoach(state, _, _2, rootGetters) {
      console.log(rootGetters['coaches/filteredCoaches'].some((coach) => coach.id === state.userId))
      console.log(rootGetters['coaches/filteredCoaches'])

      return rootGetters['coaches/filteredCoaches'].some((coach) => coach.id === state.userId)
    },
    token(state) {
      return state.token
    },
    isAuthenticated(state) {
      return state.isAuthenticated
    },
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId
      state.token = payload.token
      state.isAuthenticated = payload.isAuthenticated
    },
  },
  actions: {
    async auth(context, payload) {
      const url =
        payload.mode === 'login'
          ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwNQ0JtuTyBrPUYSOUFeJOV10S9IEghpk`
          : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwNQ0JtuTyBrPUYSOUFeJOV10S9IEghpk`
      try {
        const response = await axios.post(url, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        })

        const user = {
          token: response.data.idToken,
          userId: response.data.localId,
          tokenExpirationDate: new Date(
            response.data.expiresIn * 1000 + new Date().getTime(),
          ).toISOString(),
        }

        VueCookies.set('user', user, `${response.data.expiresIn}s`, null, null, true, 'strict')

        context.commit('setUser', { ...user, isAuthenticated: true })
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async signup(context, payload) {
      payload.mode = 'signup'
      await context.dispatch('auth', payload)
    },
    async login(context, payload) {
      payload.mode = 'login'
      await context.dispatch('auth', payload)
    },
    logout(context) {
      VueCookies.remove('token')
      context.commit('setUser', {
        userId: '',
        token: null,
        isAuthenticated: false,
      })
    },
    tryLogin(context, payload) {
      context.commit('setUser', payload)
    },
  },
}

export default authModule
