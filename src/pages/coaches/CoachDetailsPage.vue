<template>
  <div>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ selectedCoach.hourlyRate }}/hour</h3>
    </base-card>
    <base-card>
      <header>
        <h2>Interested? Reach out now</h2>
        <base-button :to="coachContactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
    <base-card>
      <base-badge v-for="area in selectedCoach.areas" :key="area" :type="area">{{
        area
      }}</base-badge>
      <p>{{ selectedCoach.description }}</p>
    </base-card>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    }
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
    },
    coachContactLink() {
      return `/coaches/${this.id}/contact`
    },
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/filteredCoaches'].find(
      (coach) => coach.id === this.id,
    )
  },
}
</script>
