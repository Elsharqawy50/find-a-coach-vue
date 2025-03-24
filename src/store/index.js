import { createStore } from 'vuex'
import coachModule from './coaches'
import requestModule from './requests'
import authModule from './auth'

const store = createStore({
  modules: {
    coaches: coachModule,
    requests: requestModule,
    auth: authModule,
  },
})

export default store
