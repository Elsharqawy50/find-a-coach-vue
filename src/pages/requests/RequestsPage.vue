<template>
  <base-card>
    <header>
      <h2>Requests Received</h2>
    </header>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <ul v-else-if="hasRequests">
      <request-item
        v-for="request in receivedRequests"
        :key="request.id"
        :email="request.email"
        :message="request.message"
      ></request-item>
    </ul>
    <h3 v-else>You haven't received any requests yet</h3>
  </base-card>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem.vue'
export default {
  components: { RequestItem },
  data() {
    return {
      isLoading: false,
      error: null,
    }
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests']
    },
    hasRequests() {
      return !this.isLoading && this.$store.getters['requests/hasRequests']
    },
  },
  created() {
    this.loadRequests()
  },

  methods: {
    async loadRequests() {
      this.isLoading = true
      try {
        await this.$store.dispatch('requests/loadRequests')
      } catch (error) {
        console.log(error)
        this.error = 'Failed to fetch requests.'
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
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
