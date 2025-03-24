<template>
  <the-heading></the-heading>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeading from './components/layout/TheHeading.vue'

export default {
  components: {
    TheHeading,
  },
  data() {
    return {
      logoutTimer: null,
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
  },
  methods: {
    setExpiryTimer() {
      if (this.logoutTimer) {
        clearTimeout(this.logoutTimer)
      }
      const userCookie = this.$cookies.get('user')
      if (userCookie) {
        const expiryTime = new Date(userCookie.tokenExpirationDate).getTime()
        const now = Date.now()
        const timeUntilExpiry = expiryTime - now
        // Optional: Immediately logout if token already expired
        if (timeUntilExpiry <= 0) {
          this.$store.dispatch('tryLogin', {
            token: null,
            userId: null,
            isAuthenticated: false,
          })
        } else {
          this.logoutTimer = setTimeout(() => {
            this.$store.dispatch('tryLogin', {
              token: null,
              userId: null,
              isAuthenticated: false,
            })
          }, timeUntilExpiry)
        }
      }
    },
  },
  created() {
    if (this.$cookies.get('user')) {
      this.setExpiryTimer()
      this.$store.dispatch('tryLogin', { ...this.$cookies.get('user'), isAuthenticated: true })
    }
  },
  watch: {
    isAuthenticated(newValue) {
      if (newValue) {
        this.setExpiryTimer()
      } else if (this.logoutTimer) {
        clearTimeout(this.logoutTimer)
      }
    },
  },
  beforeUnmount() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer)
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.15s ease-out;
}

.route-leave-active {
  transition: all 0.15s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
