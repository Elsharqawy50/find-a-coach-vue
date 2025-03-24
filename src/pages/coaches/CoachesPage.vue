<template>
  <section>
    <coach-filter @filter-data="setFilter"></coach-filter>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button to="/register" v-if="!isCoach && !isLoading && isAuthenticated">
          Register as Coach
        </base-button>
        <base-button to="/auth?redirect=register" v-if="!isAuthenticated"
          >Login to Register As Coach</base-button
        >
      </div>

      <base-dialog :show="!!error" title="An error occurred" @close="handleError">
        <p>{{ error }}</p>
      </base-dialog>

      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in coaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>

      <h3 v-else>No coaches found.</h3>
    </base-card>
  </section>
</template>

<script>
import CoachFilter from '@/components/coaches/CoachFilter.vue'
import CoachItem from '@/components/coaches/CoachItem.vue'

export default {
  components: {
    CoachItem,
    CoachFilter,
  },

  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: ['frontend', 'backend', 'career'],
    }
  },
  created() {
    this.loadCoaches()
  },
  computed: {
    coaches() {
      const filteredCoaches = this.$store.getters['coaches/filteredCoaches']
      return filteredCoaches.filter((coach) =>
        coach.areas.some((area) => this.activeFilters.includes(area)),
      )
    },
    isCoach() {
      return this.$store.getters.isCoach
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
  },
  methods: {
    setFilter(data) {
      this.activeFilters = data
    },
    async loadCoaches() {
      this.isLoading = true
      try {
        await this.$store.dispatch('coaches/loadCoaches')
      } catch (error) {
        console.log(error)

        this.error = 'Failed to fetch coaches.'
      } finally {
        this.isLoading = false
      }
    },
    handleError() {
      this.error = null
    },
  },
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
