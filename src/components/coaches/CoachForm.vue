<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstName">First Name</label>
      <input
        v-model.trim="firstName.val"
        type="text"
        id="firstName"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid">first name is required</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastName">Last Name</label>
      <input
        v-model.trim="lastName.val"
        type="text"
        id="lastName"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!firstName.isValid">last name is required</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        v-model.trim="description.val"
        id="description"
        rows="5"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!firstName.isValid">description name is required</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input v-model.number="rate.val" type="number" id="rate" @blur="clearValidity('rate')" />
      <p v-if="!firstName.isValid">rate is required</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <label for="areas">Areas of Expertise</label>
      <div>
        <input
          v-model="areas.val"
          type="checkbox"
          id="frontend"
          value="frontend"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input
          v-model="areas.val"
          type="checkbox"
          id="backend"
          value="backend"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend</label>
      </div>
      <div>
        <input
          v-model="areas.val"
          type="checkbox"
          id="career"
          value="career"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career</label>
      </div>
      <p v-if="!areas.isValid">at least one expertise is required</p>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: { val: '', isValid: true },
      lastName: { val: '', isValid: true },
      description: { val: '', isValid: true },
      rate: { val: null, isValid: true },
      areas: { val: [], isValid: true },
      formIsValid: true,
    }
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true
    },
    validateForm() {
      this.formIsValid = true
      if (this.firstName.val === '') {
        this.firstName.isValid = false
        this.formIsValid = false
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false
        this.formIsValid = false
      }

      if (this.description.val === '') {
        this.description.isValid = false
        this.formIsValid = false
      }

      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false
        this.formIsValid = false
      }

      if (this.areas.val.length === 0) {
        this.areas.isValid = false
        this.formIsValid = false
      }
    },
    submitForm() {
      this.validateForm()

      if (!this.formIsValid) {
        return
      }

      const formData = {
        id: this.$store.getters.userId,
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        description: this.description.val,
        hourlyRate: this.rate.val,
        areas: this.areas.val,
      }
      this.$emit('save-data', formData)
    },
  },
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
