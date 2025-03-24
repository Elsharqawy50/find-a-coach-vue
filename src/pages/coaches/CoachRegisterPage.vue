<template>
  <base-card>
    <h2>Register as Coach</h2>
    <coach-form @save-data="addCoach"></coach-form>
  </base-card>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue'

export default {
  components: {
    CoachForm,
  },
  methods: {
    addCoach(data) {
      this.$store.dispatch('coaches/registerCoach', data)
      this.$router.push('/coaches')
    },
  },
}
</script>
