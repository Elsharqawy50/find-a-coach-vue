<template>
  <base-card>
    <h2>Find a Coach</h2>
    <span class="filter-option">
      <input v-model="coachFilter" type="checkbox" value="frontend" id="frontend" />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input v-model="coachFilter" type="checkbox" value="backend" id="backend" />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input v-model="coachFilter" type="checkbox" value="career" id="career" />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      coachFilter: ['frontend', 'backend', 'career'],
    }
  },
  methods: {
    setFilteredCoaches(data) {
      this.$store.dispatch('coaches/setFilteredCoaches', data)
    },
  },
  created() {
    this.$emit('filter-data', this.coachFilter)
  },
  watch: {
    coachFilter(value) {
      this.$emit('filter-data', value)
    },
  },
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
