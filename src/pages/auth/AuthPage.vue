<template>
  <form @submit.prevent="submitForm">
    <base-card>
      <div class="form-control">
        <label for="email">Your Email</label>
        <input v-model.trim="email" id="email" type="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input v-model.trim="password" id="password" type="password" />
      </div>
      <p class="errors" v-if="!formIsValid">Please enter a valid email and password</p>
      <base-button>{{ submitButtonCaption }}</base-button>
      <base-button type="button" mode="flat" @click="switchModeHandler">{{
        switchButtonCaption
      }}</base-button>
    </base-card>

    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
  </form>
</template>

<script>
import BaseDialog from '@/components/ui/BaseDialog.vue'
export default {
  components: { BaseDialog },
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    }
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? 'Login' : 'Signup'
    },
    switchButtonCaption() {
      return this.mode === 'login' ? 'Signup instead' : 'Login instead'
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password === '' ||
        this.password.length < 6
      ) {
        this.formIsValid = false
        return
      }

      const authData = {
        email: this.email,
        password: this.password,
      }

      try {
        this.isLoading = true
        if (this.mode === 'signup') {
          await this.$store.dispatch('signup', authData)
        } else {
          await this.$store.dispatch('login', authData)
        }
        const redirectionLink = `/${this.$route.query.redirect || 'coaches'}`
        this.$router.replace(redirectionLink)
      } catch (error) {
        console.log(error)

        this.error = error?.response?.data?.error?.message
      } finally {
        this.isLoading = false
      }
    },
    switchModeHandler() {
      this.mode = this.mode === 'login' ? 'signup' : 'login'
    },
    handleError() {
      this.error = null
    },
  },
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
